import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3Client";
import dotenv from 'dotenv';

dotenv.config()

export async function uploadFile(file: Express.Multer.File, destinationkey: string) {
  const Bucket = process.env.AWS_BUCKET_NAME;
  if (!Bucket) throw new Error("Missing AWS_BUCKET_NAME");

  const command = new PutObjectCommand({
    Bucket,
    Key: destinationkey,
    Body: file.buffer,
    ContentType: file.mimetype,
  })
  try {
    await s3.send(command);
    const fileUrl = `https://${process.env.AWS_CLOUDFRONT_DOMAIN}/${destinationkey}`
    console.log("Image uploaded succesfully: ", file.originalname);
    return fileUrl;
  } catch(err) {
    console.log("Error occured while uploading: ", err);
  }
}