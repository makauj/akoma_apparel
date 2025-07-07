import request from 'supertest';
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
    password: 'hashedpassword', // This won't be used for auth since we'll use JWT
    isAdmin: true,
  });
  await adminUser.save();

  // Register a regular user to get the token structure
  const userRes = await request(app).post('/api/auth/register').send({
    name: 'Test User',
    email: 'test@test.com',
    password: 'test1234',
  });

  // Manually create admin token (you might need to check how generateToken works)
  const jwt = require('jsonwebtoken');
  adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
});

describe('Product API', () => {
  it('should create a product', async () => {
    const res = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Test Shirt',
        description: 'Soft cotton tee',
        price: 25,
        category: 'T-Shirts',
        inStock: true,
      });

    expect(res.status).toBe(201);
    expect(res.body.name).toBe('Test Shirt');
  });

  it('should fetch all products', async () => {
    await Product.create({
      name: 'Test Hoodie',
      description: 'Warm hoodie',
      price: 49,
      category: 'Hoodies',
      inStock: true,
    });

    const res = await request(app).get('/api/products');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Test Hoodie');
  });
});
