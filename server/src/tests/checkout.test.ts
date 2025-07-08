import request from 'supertest';
import app from '../../src/index';
import User from '../../src/models/User';
import { hashPassword } from '../../src/utils/hashPassword';
import generateToken from '../../src/utils/generateToken';
import mongoose from 'mongoose';

describe('Stripe Payment Checkout', () => {
  let token: string;

  beforeAll(async () => {
    const user = await User.create({
      name: 'Payment Tester',
      email: 'stripe@test.com',
      password: await hashPassword('secure123'),
    });
    token = generateToken(user._id.toString());
  });

  it('should create a Stripe Checkout Session with valid items', async () => {
    const res = await request(app)
      .post('/api/payments/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          { name: 'Akoma T-shirt', price: 2500, quantity: 1 },
          { name: 'Hat', price: 1200, quantity: 2 },
        ],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('url');
    expect(res.body.url).toContain('https://checkout.stripe.com');
  });

  it('should return 400 if items are missing', async () => {
    const res = await request(app)
      .post('/api/payments/checkout')
      .set('Authorization', `Bearer ${token}`)
      .send({});

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid items/i);
  });

  it('should return 401 if user is not authenticated', async () => {
    const res = await request(app)
      .post('/api/payments/checkout')
      .send({
        items: [{ name: 'Test Item', price: 1000, quantity: 1 }],
      });

    expect(res.statusCode).toBe(401);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });
});
