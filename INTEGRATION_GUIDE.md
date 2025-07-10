# 🔗 Frontend-Backend Integration Guide

## Overview
This guide outlines the integration between the Astro frontend (`/client`) and Express backend (`/server`) for the Akoma Apparel e-commerce platform.

## 🏗 Architecture Summary

### Backend (Express + TypeScript + MongoDB)
- **Location**: `/server`
- **Port**: 5000 (configurable via PORT env var)
- **Base URL**: `http://localhost:5000`
- **Features**: Authentication, Products, Cart, Orders, Payments (Stripe)

### Frontend (Astro + React Components)
- **Location**: `/client` 
- **Port**: 4322 (Astro dev server)
- **Base URL**: `http://localhost:4322`
- **Features**: Product catalog, shopping cart, checkout, user management

## 🔌 Integration Options

### Option 1: Direct API Calls (Recommended)
- Frontend API client calls backend directly
- Simpler architecture, better performance
- Requires CORS configuration (already enabled)

### Option 2: Astro API Proxy Routes
- Astro API routes proxy requests to backend
- More complex but provides flexibility for data transformation
- Useful for adding caching or authentication layers

## 🛠 Implementation Steps

### 1. Environment Configuration

**Backend (.env)**:
```bash
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/akoma_apparel
JWT_SECRET=your-super-secret-jwt-key-here
FRONTEND_URL=http://localhost:4322
STRIPE_SECRET_KEY=sk_test_your_stripe_key
```

**Frontend (.env)**:
```bash
BACKEND_URL=http://localhost:5000
PUBLIC_API_BASE_URL=http://localhost:5000
```

### 2. API Client Configuration
- Update `/client/src/utils/api.ts` to point to backend
- Add authentication token management
- Handle error responses consistently

### 3. Component Integration
- Replace mock data with API calls
- Add loading states and error handling
- Implement authentication flows

### 4. Development Workflow
1. Start backend: `cd server && npm run dev`
2. Start frontend: `cd client && npm run dev`
3. Backend available at: http://localhost:5000
4. Frontend available at: http://localhost:4322

## 🔐 Authentication Flow

### Registration/Login
1. User submits credentials via frontend form
2. Frontend calls `/api/auth/register` or `/api/auth/login`
3. Backend returns JWT token + user data
4. Frontend stores token (localStorage/sessionStorage)
5. Token included in subsequent API requests via Authorization header

### Protected Routes
- Frontend checks for valid token before rendering protected content
- Backend validates token on protected endpoints
- Automatic logout on token expiration

## 📊 Data Models

### Product
```typescript
interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  imageUrl?: string;
  inStock: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### User
```typescript
interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}
```

### Cart
```typescript
interface Cart {
  _id: string;
  user: string;
  items: Array<{
    product: Product;
    quantity: number;
  }>;
  createdAt: string;
  updatedAt: string;
}
```

## 🚀 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users/profile` - Get user profile (protected)
- `POST /api/users/forgot-password` - Password reset request
- `POST /api/users/reset-password` - Reset password with code

### Products
- `GET /api/products` - Get products with pagination/filtering
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update item quantity
- `DELETE /api/cart/remove/:productId` - Remove item
- `DELETE /api/cart/clear` - Clear cart
- `GET /api/cart/count` - Get cart item count

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/user/:userId` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `PUT /api/orders/:id/status` - Update order status (admin only)

### Payments
- `POST /api/payments/checkout` - Create Stripe checkout session

## 🧪 Testing

### Backend Testing
```bash
cd server
npm test
```

### Integration Testing
1. Start both servers
2. Test user registration/login flow
3. Test product browsing and cart operations
4. Test checkout process
5. Test admin functions

## 🔧 Troubleshooting

### Common Issues
1. **CORS Errors**: Ensure backend CORS is configured for frontend origin
2. **Auth Token Issues**: Check token format and expiration
3. **Database Connection**: Verify MongoDB is running and connection string is correct
4. **Port Conflicts**: Ensure ports 5000 and 4322 are available

### Debug Commands
```bash
# Check backend health
curl http://localhost:5000/api

# Test user registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Test products endpoint
curl http://localhost:5000/api/products
```

## 📋 Next Steps

1. **Immediate**: Connect API client to backend and test basic flows
2. **Short-term**: Implement authentication and cart functionality
3. **Medium-term**: Add payment processing and order management
4. **Long-term**: Optimize performance, add advanced features

## 🔒 Security Considerations

- Use HTTPS in production
- Validate all user inputs
- Implement rate limiting
- Secure JWT secret and other environment variables
- Regular security audits of dependencies

---

**Last Updated**: Current
**Status**: Ready for implementation
