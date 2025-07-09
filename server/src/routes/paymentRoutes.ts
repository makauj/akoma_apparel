import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import { createCheckoutSession } from '../controllers/paymentController';
import { protect } from '../middleware/authMiddleware';
import { asyncHandler } from '../middleware/asyncHandler';

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2025-06-30.basil'
});

router.post('/intent', protect, asyncHandler(async (req, res) => {
  const { amount } = req.body;

  if (!amount || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Amount is required and must be a number' });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { integration_check: 'accept_a_payment' }
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create payment intent' });
    }
}));

router.post('/checkout', protect, asyncHandler(createCheckoutSession));

export default router;
