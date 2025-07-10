import Stripe from 'stripe';
import { Request, Response } from 'express';
<<<<<<< HEAD

=======
import dotenv from 'dotenv'
dotenv.config()
>>>>>>> d43eb0ea12faac5e738d6b4ee026321542559b9b
// Initialize Stripe with environment variable
const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  throw new Error('STRIPE_SECRET_KEY environment variable is required');
}

<<<<<<< HEAD
const stripe = new Stripe(stripeKey as string, {
  apiVersion: '2025-06-30.basil',
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { items } = req.body;
=======
const stripe = new Stripe(stripeKey);

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { items } = req.body; // expects [{ name, price, quantity }]
>>>>>>> d43eb0ea12faac5e738d6b4ee026321542559b9b

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
<<<<<<< HEAD

export const createPaymentIntent = async (req: Request, res: Response) => {
  try {
    const { amount, currency = 'kes' } = req.body;

    if (!amount || typeof amount !== 'number') {
      return res.status(400).json({ message: 'Invalid amount' });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency,
      automatic_payment_methods: { enabled: true },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err: any) {
    res.status(400).json({ message: 'Stripe error', error: err.message });
  }
};
=======
>>>>>>> d43eb0ea12faac5e738d6b4ee026321542559b9b
