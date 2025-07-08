import request from 'supertest';
import app from '../../src/index';
import mongoose from 'mongoose';
import User from '../../src/models/User';
import Order from '../../src/models/Order';
import generateToken from '../../src/utils/generateToken';
import { hashPassword } from '../../src/utils/hashPassword';

describe('Update Order Status (Admin)', () => {
  let adminToken: string;
  let userToken: string;
  let orderId: string;

  beforeAll(async () => {
    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: await hashPassword('admin123'),
      isAdmin: true,
    });
    adminToken = generateToken(admin._id.toString());

    // Create regular user
    const user = await User.create({
      name: 'User',
      email: 'user@example.com',
      password: await hashPassword('user123'),
    });
    userToken = generateToken(user._id.toString());

    // Create an order for testing
    const order = await Order.create({
      user: user._id,
      items: [
        {
          product: new mongoose.Types.ObjectId(),
          quantity: 1,
          price: 100,
        },
      ],
      totalAmount: 100,
      status: 'pending',
    });

    orderId = order._id.toString();
  });

  it('should allow admin to update order status', async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'shipped' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/order updated/i);
    expect(res.body.order.status).toBe('shipped');
  });

  it('should reject invalid status value', async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'flying' });

    expect(res.statusCode).toBe(400);
    expect(res.body.message).toMatch(/invalid status/i);
  });

  it('should block non-admin users', async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}/status`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({ status: 'processing' });

    expect(res.statusCode).toBe(403);
  });

  it('should return 404 for non-existent order', async () => {
    const res = await request(app)
      .put(`/api/orders/64f000000000000000000000/status`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'delivered' });

    expect(res.statusCode).toBe(404);
  });

  afterAll(async () => {
    await Order.deleteMany({});
    await User.deleteMany({});
    await mongoose.connection.close();
  });
});
