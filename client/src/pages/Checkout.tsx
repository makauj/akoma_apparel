// src/pages/Checkout.tsx
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/layout/CheckoutForm';
import OrderSummary from '../components/layout/OrderSummary';
import { motion } from 'framer-motion';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-8 text-gradient-primary">🛒 Checkout</h1>
          <CheckoutForm />
        </motion.div>

        <motion.div 
          className="bg-white p-8 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-6 text-amber-600">🧾 Order Summary</h2>
          <OrderSummary />
        </motion.div>
      </div>
    </Elements>
  );
}
