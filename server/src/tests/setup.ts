import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from 'dotenv';
import path from 'path';

// Load test environment variables from .env.test file
dotenv.config({ path: path.resolve(__dirname, '../../.env.test') });

// Ensure test environment
process.env.NODE_ENV = 'test';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  
  // Disconnect any existing connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  
  await mongoose.connect(uri);
}, 30000); // Increase timeout to 30 seconds

afterEach(async () => {
  const db = mongoose.connection.db;

  if (!db) return;

  const collections = await db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});
