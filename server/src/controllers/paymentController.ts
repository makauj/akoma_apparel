import Stripe from 'stripe';
import { Request, Response } from 'express';

// Initialize Stripe with a test key for testing environment
const stripeKey = process.env.STRIPE_SECRET_KEY || '<STRIPE_SECRET_KEY_REMOVED>';
const stripe = new Stripe(stripeKey);

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { items } = req.body; // expects [{ name, price, quantity }]

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid items' });
  }

  // Mock response for test environment
  if (process.env.NODE_ENV === 'test') {
    return res.json({ 
      url: 'https://checkout.stripe.com/pay/cs_test_mock_session_url' 
    });
  }

  const line_items = items.map(item => ({
    price_data: {
      currency: 'kes',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100,
    },
    quantity: item.quantity,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: 'Stripe error', error: err });
  }
};
