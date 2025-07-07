import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3Client";
import dotenv from 'dotenv';

dotenv.config()

export async function uploadFile(file: any, destinationkey: string): Promise<string> {
  // In test environment, return a mock URL
  if (process.env.NODE_ENV === 'test') {
    return `https://mock-bucket.s3.amazonaws.com/${destinationkey}`;
  }

  const Bucket = process.env.AWS_BUCKET_NAME;
  if (!Bucket) throw new Error("Missing AWS_BUCKET_NAME environment variable");

  const command = new PutObjectCommand({
    Bucket,
    Key: destinationkey,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read', // Make the file publicly accessible
  });

  try {
    await s3.send(command);
    
    // Return CloudFront URL if available, otherwise S3 URL
    const fileUrl = process.env.AWS_CLOUDFRONT_DOMAIN 
      ? `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${destinationkey}`
      : `https://${Bucket}.s3.amazonaws.com/${destinationkey}`;
    
    console.log("File uploaded successfully: ", file.originalname);
    return fileUrl;
  } catch(err) {
    console.error("Error occurred while uploading: ", err);
    throw new Error(`Failed to upload file: ${err instanceof Error ? err.message : 'Unknown error'}`);
  }
}
