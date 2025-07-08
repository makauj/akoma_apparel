import request from 'supertest';
import app from '../../src/index';
import User from '../../src/models/User';
import mongoose from 'mongoose';

describe('Password Reset', () => {
  let email = 'testuser@example.com';

  beforeEach(async () => {
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
    // First, request a reset code
    const resetRes = await request(app)
      .post('/api/users/forgot-password')
      .send({ email });

    expect(resetRes.statusCode).toBe(200);

    const user = await User.findOne({ email });
    expect(user).toBeTruthy();
    expect(user?.resetCode).toBeDefined();
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
});
