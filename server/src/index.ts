import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import productRoutes from './routes/productRoutes';
import userRoutes from './routes/userRoutes';
import orderRoutes from './routes/orderRoutes';
import paymentRoutes from './routes/paymentRoutes';
import { notFound, errorHandler } from './middleware/errorMiddleware';
import cartRoutes from './routes/cartRoutes';

dotenv.config();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/akoma_apparel';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check route
app.get('/', (_req, res) => {
  res.send('API is running...');
});

// Define a simple route
app.get('/api', (_req, res) => {
  res.json({ message: 'Welcome to the API!' });
});

// Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', userRoutes); // Add auth alias for backward compatibility
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/payments', paymentRoutes);

// Error middlewares (should come after routes!)
app.use(notFound);
app.use(errorHandler);

// Only start server if this file is run directly (not during tests)
if (require.main === module) {
  // Connect to MongoDB and start server
  mongoose.connect(MONGO_URI)
    .then(() => {
      console.log('✅ Connected to MongoDB');
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to connect to MongoDB:', err);
      process.exit(1);
    });
}

// Export app for testing purposes
export default app;