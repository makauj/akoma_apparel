import request from 'supertest';
import app from '../index';
import Cart from '../models/cart';
import Product from '../models/Product';
import User from '../models/User';

let token: string;
let productId: string;

beforeEach(async () => {
  // Clean up before each test
  await Cart.deleteMany({});
  await Product.deleteMany({});
  await User.deleteMany({});

  // Create admin user for product creation
  const adminUser = new User({
    name: 'Admin User',
    email: 'admin@test.com',
    password: 'hashedpassword',
    isAdmin: true,
  });
  await adminUser.save();

  const jwt = require('jsonwebtoken');
  const adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  // Register regular user for cart operations
  const userRes = await request(app).post('/api/auth/register').send({
    name: 'Cart User',
    email: 'cart@test.com',
    password: 'test1234',
  });

  token = userRes.body.token;

  // Create a product using admin privileges
  const productRes = await request(app)
    .post('/api/products')
    .set('Authorization', `Bearer ${adminToken}`)
    .send({
      name: 'Test Cart Product',
      description: 'A product for cart testing',
      price: 2500,
      category: 'Tees',
      inStock: true,
    });

  productId = productRes.body._id;
}, 15000); // Increase timeout for setup

describe('🛒 Cart API', () => {
  it('adds a product to the cart', async () => {
    const res = await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({
        productId,
        quantity: 2,
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBe(1);
    expect(res.body.items[0].product._id).toBe(productId);
    expect(res.body.items[0].quantity).toBe(2);
  });

  it('updates item quantity in the cart', async () => {
    await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 1 });

    const res = await request(app)
      .put('/api/cart/update')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 5 });

    expect(res.statusCode).toBe(200);
    expect(res.body.items[0].quantity).toBe(5);
  });

  it('removes a product from the cart', async () => {
    await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 1 });

    const res = await request(app)
      .delete(`/api/cart/remove/${productId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBe(0);
  });

  it('clears the cart', async () => {
    await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 3 });

    const res = await request(app)
      .delete('/api/cart/clear')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Cart cleared');
  });

  it('retrieves the current cart', async () => {
    await request(app)
      .post('/api/cart/add')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId, quantity: 1 });

    const res = await request(app)
      .get('/api/cart')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.items.length).toBe(1);
  });
});
