import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

async function fetchAndPrintBucket() {
  // Initialize S3 client with your configuration
  const s3Client = new S3Client({
    credentials: {
      accessKeyId: 'O3_N0HIPKET8MQN5FK5K',
      secretAccessKey: 'lDKZA1F5vFKBPn5b7kF6f0QcepZJtBHNuXgNIOU',
    },
    endpoint: 'https://o3-rc2.akave.xyz',
    region: 'us-east-1',
    forcePathStyle: true,
  });

  try {
    const command = new ListObjectsV2Command({
      Bucket: 'test-bucket-ts',
    });

    const response = await s3Client.send(command);
    
    if (response.Contents && response.Contents.length > 0) {
      console.log(`Found ${response.Contents.length} objects in test-bucket-ts:`);
      console.log('='.repeat(50));
      
      response.Contents.forEach((obj, index) => {
        console.log(`${index + 1}. ${obj.Key}`);
        console.log(`   Size: ${obj.Size} bytes`);
        console.log(`   Last Modified: ${obj.LastModified}`);
        console.log(`   ETag: ${obj.ETag}`);
        console.log('');
      });
    } else {
      console.log('No objects found in test-bucket-ts');
    }
  } catch (error) {
    console.error('Error fetching bucket contents:', error);
  }
}

// Call the function
fetchAndPrintBucket();
