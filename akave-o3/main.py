from pyiceberg.catalog import load_catalog
from pyiceberg.schema import Schema
from pyiceberg.types import NestedField, StringType, DoubleType, LongType
import pyarrow as pa
import os

# Reuse env: AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_ENDPOINT_URL, AWS_DEFAULT_REGION

os.environ['AWS_ACCESS_KEY_ID'] = 'O3_N0HIPKET8MQN5FK5K'
os.environ['AWS_SECRET_ACCESS_KEY'] = 'lDKZA1F5vFKBPn5b7kF6f0QcepZJtBHNuXgNIOU'
os.environ['AWS_ENDPOINT_URL'] = 'https://o3-rc2.akave.xyz'
os.environ['AWS_S3_USE_VIRTUAL_HOSTED_STYLE_URL'] = 'false'
os.environ['AWS_DEFAULT_REGION'] = 'us-east-1'

# Use a local SQL catalog but force PyArrow FileIO so all reads/writes go via pyarrow.fs
catalog = load_catalog(
    "rest",
    **{
        "type": "sql",
        "uri": "sqlite:///C:/temp/pyiceberg_catalog_s3.db",
        "warehouse": "s3://test-bucket/warehouse",
        "py-io-impl": "pyiceberg.io.pyarrow.PyArrowFileIO",
        "s3.endpoint": os.environ["AWS_ENDPOINT_URL"],
        "s3.region": os.environ["AWS_DEFAULT_REGION"],
        "s3.force-virtual-addressing": "False",
        "s3.multipart.enabled": "False",
        "s3.max_concurrency": "1",
        "s3.multipart-threshold": "104857600",  # 100MB threshold (high value to avoid multipart)
        "s3.multipart-part-size": "104857600",  # 100MB part size
        "s3.write.max-file-size": "104857600",
        # For safety if the backend still considers thresholds:
    },
)

# 0) Ensure namespace exists once
try:
    catalog.create_namespace("demo1")
except Exception:
    pass

def ensure_table(table_name: str):
    schema = Schema(
    NestedField(1, "earnings", DoubleType(), required=True),
    NestedField(2, "views", LongType(), required=True),
    NestedField(3, "likes", LongType(), required=True),
    NestedField(4, "stakes", DoubleType(), required=True),
    NestedField(5, "average_watch_time", DoubleType(), required=True),
    NestedField(6, "unique_views", LongType(), required=True),
    NestedField(7, "engagement_rate", DoubleType(), required=True),
    NestedField(8, "token_price", DoubleType(), required=True),
    NestedField(9, "token_volume", DoubleType(), required=True),
    identifier_field_ids=[1],  # Using earnings as the identifier
    )

    location = f"s3://test-bucket/warehouse/demo/{table_name}"

    # 1) Create if missing; returns existing table if it already exists
    table = catalog.create_table_if_not_exists(
        f"demo.{table_name}",
        schema=schema,
        location=location,
    )

    # 2) Load to ensure the handle is fresh (optional, but consistent)
    return catalog.load_table(f"demo.{table_name}")

tbl = ensure_table("CreatorsTribeCreatorTable")


# Upsert and snapshot functions stay the same as before
def update_table(table, records, join_cols=None, update_on_match=True, insert_on_no_match=True):
    arrow_tbl = pa.Table.from_pylist(records, schema=table.schema().as_arrow())
    return table.upsert(
        df=arrow_tbl,
        join_cols=join_cols,
        when_matched_update_all=update_on_match,
        when_not_matched_insert_all=insert_on_no_match,
        case_sensitive=True,
    )

def get_snapshot(table, which="current", snapshot_id=None):

    if which == "current":
        current_snap = table.current_snapshot()
        return current_snap
    
    elif which == "by_id":
        if snapshot_id is None:
            raise ValueError("snapshot_id is required when which='by_id'")

        try:
            history = table.history()
            for entry in history:
                if entry.snapshot_id == snapshot_id:
                    return entry
        except AttributeError:
            pass
        
        snapshots = table.snapshots()
        for snapshot in snapshots:
            if snapshot.snapshot_id == snapshot_id:
                return snapshot
        return None
    
    elif which == "all":
        try:

            history = list(table.history())
            if history:
                return history
        except AttributeError:
            pass
        
        return list(table.snapshots())
    
    else:
        raise ValueError("which must be one of: 'current', 'by_id', 'all'")


def send_snapshot_to_ts_bucket(table, bucket_name="test-bucket-ts", which="current", snapshot_id=None):

    import boto3
    import json
    from datetime import datetime
    
    # Initialize S3 client with your credentials
    s3_client = boto3.client(
        's3',
        aws_access_key_id=os.environ['AWS_ACCESS_KEY_ID'],
        aws_secret_access_key=os.environ['AWS_SECRET_ACCESS_KEY'],
        endpoint_url=os.environ['AWS_ENDPOINT_URL'],
        region_name=os.environ['AWS_DEFAULT_REGION']
    )
    
    # Get snapshot(s) based on request
    snapshot_data = get_snapshot(table, which=which, snapshot_id=snapshot_id)
    
    if snapshot_data is None:
        print(f"No snapshot found for criteria: which={which}, snapshot_id={snapshot_id}")
        return {"status": "error", "message": "No snapshot found"}
    
    # Get table metadata for context
    table_name = table.name().split('.')[-1]  # Extract table name
    namespace = table.name().split('.')[0] if '.' in table.name() else "default"
    
    results = {"status": "success", "uploaded_files": []}
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    try:
        if which == "all":
            # Upload all snapshots as a single file
            snapshots_data = {
                "table_name": table_name,
                "namespace": namespace,
                "export_timestamp": timestamp,
                "total_snapshots": len(snapshot_data),
                "snapshots": []
            }
            
            for snap in snapshot_data:
                snap_info = {
                    "snapshot_id": snap.snapshot_id,
                    "timestamp_ms": snap.timestamp_ms if hasattr(snap, 'timestamp_ms') else None,
                    "parent_snapshot_id": getattr(snap, 'parent_snapshot_id', None),
                    "operation": getattr(snap, 'operation', None),
                    "summary": getattr(snap, 'summary', {}),
                    "manifest_list": getattr(snap, 'manifest_list', None)
                }
                snapshots_data["snapshots"].append(snap_info)
            
            # Upload all snapshots file
            s3_key = f"iceberg_exports/{namespace}/{table_name}/all_snapshots_{timestamp}.json"
            s3_client.put_object(
                Bucket=bucket_name,
                Key=s3_key,
                Body=json.dumps(snapshots_data, indent=2, default=str),
                ContentType='application/json'
            )
            results["uploaded_files"].append(s3_key)
            print(f"Uploaded all {len(snapshot_data)} snapshots to: {s3_key}")
            
        else:
            # Upload single snapshot (current or by_id)
            snap_info = {
                "table_name": table_name,
                "namespace": namespace,
                "export_timestamp": timestamp,
                "snapshot_type": which,
                "snapshot_data": {
                    "snapshot_id": snapshot_data.snapshot_id,
                    "timestamp_ms": snapshot_data.timestamp_ms if hasattr(snapshot_data, 'timestamp_ms') else None,
                    "parent_snapshot_id": getattr(snapshot_data, 'parent_snapshot_id', None),
                    "operation": getattr(snapshot_data, 'operation', None),
                    "summary": getattr(snapshot_data, 'summary', {}),
                    "manifest_list": getattr(snapshot_data, 'manifest_list', None)
                }
            }
            
            # Upload single snapshot file
            snap_id = snapshot_data.snapshot_id
            s3_key = f"iceberg_exports/{namespace}/{table_name}/{which}_snapshot_{snap_id}_{timestamp}.json"
            s3_client.put_object(
                Bucket=bucket_name,
                Key=s3_key,
                Body=json.dumps(snap_info, indent=2, default=str),
                ContentType='application/json'
            )
            results["uploaded_files"].append(s3_key)
            print(f"Uploaded {which} snapshot {snap_id} to: {s3_key}")
        
        # Also upload table metadata summary
        table_metadata = {
            "table_name": table_name,
            "namespace": namespace,
            "location": str(table.location()),
            "schema": str(table.schema()),
            "current_snapshot_id": table.current_snapshot().snapshot_id if table.current_snapshot() else None,
            "export_timestamp": timestamp
        }
        
        metadata_key = f"iceberg_exports/{namespace}/{table_name}/table_metadata_{timestamp}.json"
        s3_client.put_object(
            Bucket=bucket_name,
            Key=metadata_key,
            Body=json.dumps(table_metadata, indent=2, default=str),
            ContentType='application/json'
        )
        results["uploaded_files"].append(metadata_key)
        print(f"Uploaded table metadata to: {metadata_key}")
        
    except Exception as e:
        print(f"Error uploading snapshot to S3: {e}")
        results["status"] = "error"
        results["error"] = str(e)
    
    return results






