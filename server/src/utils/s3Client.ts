import dotenv from 'dotenv';
import { S3Client } from "@aws-sdk/client-s3"

dotenv.config();

let s3Instance: S3Client | null = null;

// Lazy initialization of S3 client
export const s3 = new Proxy({} as S3Client, {
  get(target, prop) {
    if (!s3Instance) {
      // Only initialize when actually needed
      const region = process.env.AWS_REGION;
      const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
      const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

      // For test environment, use mock values if AWS credentials are not provided
      if (process.env.NODE_ENV === 'test') {
        s3Instance = new S3Client({
          region: region || 'us-east-1',
          credentials: {
            accessKeyId: accessKeyId || 'mock-access-key',
            secretAccessKey: secretAccessKey || 'mock-secret-key',
          },
        });
      } else {
        // For production/development, require real credentials
        if (!region) throw new Error("Missing AWS_REGION environment variable");
        if (!accessKeyId) throw new Error("Missing AWS_ACCESS_KEY_ID environment variable");
        if (!secretAccessKey) throw new Error("Missing AWS_SECRET_ACCESS_KEY environment variable");

        s3Instance = new S3Client({
          region,
          credentials: {
            accessKeyId,
            secretAccessKey,
          }
        });
      }
    }
    return s3Instance[prop as keyof S3Client];
  }
});
