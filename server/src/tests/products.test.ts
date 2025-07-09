import request from 'supertest';
import app from '../../src/index';
import Product from '../../src/models/Product';
import mongoose from 'mongoose';
import { Product as ProductType } from '../../src/types/express/product';

beforeAll(async () => {
  await Product.deleteMany({});
  await Product.insertMany([
    {
      name: 'Black Shirt',
      description: 'Basic black shirt',
      price: 2000,
      category: 'shirts',
      inStock: true,
    },
    {
      name: 'Blue Shirt',
      description: 'Stylish blue shirt',
      price: 3000,
      category: 'shirts',
      inStock: true,
    },
    {
      name: 'Red Hoodie',
      description: 'Warm hoodie',
      price: 5000,
      category: 'hoodies',
      inStock: false,
    },
    {
      name: 'Sneakers',
      description: 'Running shoes',
      price: 8000,
      category: 'shoes',
      inStock: true,
    },
  ]);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('GET /api/products', () => {
  it('returns all products by default', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBeGreaterThan(0);
  });

  it('filters by keyword in name', async () => {
    const res = await request(app).get('/api/products?keyword=shirt');
    const products = res.body.products as ProductType[];
    expect(res.statusCode).toBe(200);
    expect(products.every(p => p.name.toLowerCase().includes('shirt'))).toBe(true);
  });

  it('filters by category', async () => {
    const res = await request(app).get('/api/products?category=shoes');
    const products = res.body.products as ProductType[];
    expect(res.statusCode).toBe(200);
    expect(products.every(p => p.category === 'shoes')).toBe(true);
  });

  it('filters by inStock=true', async () => {
    const res = await request(app).get('/api/products?inStock=true');
    const products = res.body.products as ProductType[];
    expect(res.statusCode).toBe(200);
    expect(products.every(p => p.inStock === true)).toBe(true);
  });

  it('filters by inStock=false', async () => {
    const res = await request(app).get('/api/products?inStock=false');
    const products = res.body.products as ProductType[];
    expect(res.statusCode).toBe(200);
    expect(products.every(p => p.inStock === false)).toBe(true);
  });

  it('sorts by price ascending', async () => {
    const res = await request(app).get('/api/products?sort=price_asc');
    const products = res.body.products as ProductType[];
    expect(res.statusCode).toBe(200);
    const prices = products.map(p => p.price);
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('sorts by name descending', async () => {
    const res = await request(app).get('/api/products?sort=name_desc');
    const products = res.body.products as ProductType[];
    expect(res.statusCode).toBe(200);
    const names = products.map(p => p.name);
    expect(names).toEqual([...names].sort().reverse());
  });

  it('converts price to USD', async () => {
    const res = await request(app).get('/api/products?currency=USD');
    const products = res.body.products as ProductType[];
    expect(res.statusCode).toBe(200);
    expect(products.every(p => p.currency === 'USD')).toBe(true);
  });

  it('paginates results correctly', async () => {
    const res = await request(app).get('/api/products?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.page).toBe(1);
    expect(res.body.pages).toBeGreaterThanOrEqual(1);
  });

  it('includes hasMore in the respose', async () => {
    const res = await request(app).get('/api/products?page=1');
    expect(res.statusCode).toBe(200);
    expect(res.body.hasMore).toBeDefined();
    // hasMore should be true only if there are more pages
    // For a single page, expect false
    expect(res.body.hasMore).toBe(false);
  });

  it('returns empty array for non-existent page', async () => {
      const res = await request(app).get('/api/products?page=999');
      expect(res.statusCode).toBe(200);
      expect(res.body.products.length).toBe(0);
  });
});
