import dotenv from 'dotenv';
import { S3Client } from "@aws-sdk/client-s3"

dotenv.config();
const region = process.env.AWS_REGION
if (!region) throw new Error("Missing AWS_REGION");

const accessKeyId = process.env.AWS_ACCESS_KEY
if (!accessKeyId) throw new Error("Missing AWS_ACCESS_KEY");

const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
if (!secretAccessKey) throw new Error("Missing AWS_SECRET_ACCESS_KEY");

// s3 client used during image upload
export const s3 = new S3Client({
  region,
  credentials: {
    accessKeyId,
    secretAccessKey,
  }
})
