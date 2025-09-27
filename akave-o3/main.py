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
        NestedField(1, "id", LongType(), required=True),
        NestedField(2, "city", StringType(), required=True),
        NestedField(3, "lat", DoubleType(), required=True),
        NestedField(4, "lon", DoubleType(), required=True),
        identifier_field_ids=[1],
    )
    location = f"s3://test-bucket/warehouse/demo1/{table_name}"

    # 1) Create if missing; returns existing table if it already exists
    table = catalog.create_table_if_not_exists(
        f"demo1.{table_name}",
        schema=schema,
        location=location,
    )

    # 2) Load to ensure the handle is fresh (optional, but consistent)
    return catalog.load_table(f"demo1.{table_name}")

tbl = ensure_table("cities")


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
        return table.current_snapshot()
    if which == "by_id":
        for s in table.snapshots():
            if s.snapshot_id == snapshot_id:
                return s
        return None
    if which == "all":
        return list(table.snapshots())
    raise ValueError("which must be one of: current | by_id | all")
