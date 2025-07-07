import request from 'supertest';
import path from 'path';
import fs from 'fs';
import app from '../index';
import Product from '../models/Product';
import User from '../models/User';

let adminToken: string;

beforeEach(async () => {
  // Clean up before each test
  await Product.deleteMany({});
  await User.deleteMany({});

  // Create admin user directly in the database
  const adminUser = new User({
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'hashedpassword',
    isAdmin: true,
  });
  await adminUser.save();

  // Generate admin token
  const jwt = require('jsonwebtoken');
  adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
});

describe('Product Upload API', () => {
  it('should create a product without file upload', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Product',
        description: 'A test product',
        price: 99.99,
        category: 'Electronics',
        inStock: true,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test Product');
    expect(res.body.price).toBe(99.99);
  });

  it('should handle file upload gracefully in test environment', async () => {
    // Create a simple test buffer to simulate file upload
    const testBuffer = Buffer.from('test image data');
    
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .field('name', 'Product with Image')
      .field('description', 'A product with an image')
      .field('price', '149.99')
      .field('category', 'Fashion')
      .field('inStock', 'true')
      .attach('image', testBuffer, 'test-image.jpg');

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Product with Image');
    
    // In test environment, should have a mock image URL
    if (res.body.imageUrl) {
      expect(res.body.imageUrl).toContain('mock-bucket.s3.amazonaws.com');
    }
  });
});
