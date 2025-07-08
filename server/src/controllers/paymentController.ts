import Stripe from 'stripe';
import { Request, Response } from 'express';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
});

export const createCheckoutSession = async (req: Request, res: Response) => {
  const { items } = req.body; // expects [{ name, price, quantity }]

  if (!items || !Array.isArray(items)) {
    return res.status(400).json({ message: 'Invalid items' });
  }

  const line_items = items.map(item => ({
    price_data: {
      currency: 'kes',
      product_data: {
        name: item.name,
      },
      unit_amount: item.price * 100, // Stripe uses cents
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
