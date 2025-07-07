import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

// Set test environment variables
process.env.JWT_SECRET = 'test-jwt-secret-key-for-testing-only';
process.env.NODE_ENV = 'test';

let mongo: MongoMemoryServer;

beforeAll(async () => {
  // Close any existing connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  
  await mongoose.connect(uri);
}, 30000); // Increase timeout to 30 seconds

afterEach(async () => {
  const db = mongoose.connection.db;

  if (!db) return;

  try {
    const collections = await db.collections();
    for (let collection of collections) {
      await collection.deleteMany({});
    }
  } catch (error) {
    console.log('Error cleaning collections:', error);
  }
});

afterAll(async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
    if (mongo) {
      await mongo.stop();
    }
  } catch (error) {
    console.log('Error during cleanup:', error);
  }
}, 30000);
