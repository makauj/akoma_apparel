import request from 'supertest';
import app from '../index';

describe('Order API', () => {
  let userToken: string;
  let adminToken: string;
  let productId: string;
  let orderId: string;

  beforeEach(async () => {
    // Register regular user
    const userRes = await request(app).post('/api/auth/register').send({
      name: 'Order User',
      email: 'user@order.com',
      password: 'userpass123',
    });
    userToken = userRes.body.token;

    // Register admin user
    const adminRes = await request(app).post('/api/auth/register').send({
      name: 'Admin',
      email: 'admin@order.com',
      password: 'adminpass123',
    });
    adminToken = adminRes.body.token;

    // Manually update user to admin in DB
    const User = (await import('../models/User')).default;
    await User.findOneAndUpdate({ email: 'admin@order.com' }, { isAdmin: true });

    // Create product
    const productRes = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        name: 'Order Product',
        description: 'Test product for orders',
        price: 1500,
        category: 'Shoes',
        inStock: true,
      });

    productId = productRes.body._id;
  });

  it('creates a new order', async () => {
    const res = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${userToken}`)
      .send({
        items: [{ product: productId, quantity: 2, price: 1500 }],
        shippingAddress: {
          address: '123 Market Street',
          city: 'Nairobi',
          postalCode: '00100',
          country: 'Kenya',
        },
        paymentMethod: 'PayPal',
        totalPrice: 3000,
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.items.length).toBe(1);
    expect(res.body.shippingAddress.city).toBe('Nairobi');
    orderId = res.body._id;
  });

  it('fetches user orders', async () => {
    const res = await request(app)
      .get('/api/orders/my')
      .set('Authorization', `Bearer ${userToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('allows admin to get all orders', async () => {
    const res = await request(app)
      .get('/api/orders')
      .set('Authorization', `Bearer ${adminToken}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('marks an order as paid', async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}/pay`)
      .set('Authorization', `Bearer ${userToken}`)
      .send({});

    expect(res.statusCode).toBe(200);
    expect(res.body.isPaid).toBe(true);
  });

  it('marks an order as delivered (admin only)', async () => {
    const res = await request(app)
      .put(`/api/orders/${orderId}/deliver`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({});

    expect(res.statusCode).toBe(200);
    expect(res.body.isDelivered).toBe(true);
  });
});
