import request from 'supertest';
import app from '../../src/index';
import User from '../../src/models/User';
import mongoose from 'mongoose';

describe('Password Reset', () => {
  let email = 'testuser@example.com';

  beforeAll(async () => {
    await User.create({
      name: 'Test User',
      email,
      password: 'initial123',
    });
  });

  it('sends reset code to user email', async () => {
    const res = await request(app)
      .post('/api/users/forgot-password')
      .send({ email });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/reset code sent/i);

    const user = await User.findOne({ email });
    expect(user?.resetCode).toBeDefined();
  });

  it('resets the password using code', async () => {
    const user = await User.findOne({ email });
    const code = user!.resetCode;

    const res = await request(app)
      .post('/api/users/reset-password')
      .send({
        email,
        code,
        newPassword: 'newPassword123',
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/password has been reset/i);
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });
});
