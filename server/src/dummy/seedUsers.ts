import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User';
import { hashPassword } from '../utils/hashPassword';

dotenv.config();

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/akoma_apparel');

    await User.deleteMany({});

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: await hashPassword('admin123'),
        isAdmin: true,
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: await hashPassword('john123'),
        isAdmin: false,
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: await hashPassword('jane123'),
        isAdmin: false,
      },
    ];

    await User.insertMany(users);

    console.log('✅ Users seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding users:', err);
  } finally {
    mongoose.connection.close();
  }
}

seedUsers();
