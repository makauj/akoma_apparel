import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import OrderSummary from './OrderSummary'
import { motion } from 'framer-motion';

const CheckoutSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  address: z.string().min(1, 'Address is required'),
});

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

export default function CheckoutForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(CheckoutSchema),
  });

  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => Number(sum) + Number(item.price) * Number(item.quantity), 0);

  // Show summary on mobile toggle
  const [showSummary] = useState<boolean>(false);

  const onSubmit = async (data: CheckoutFormData) => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError('');

    try {
      const amount = cart.reduce((sum, item) => Number(sum) + Number(item.price) * Number(item.quantity), 0);

      const res = await fetch('/api/payments/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });
      const { clientSecret } = await res.json();

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: data.name,
            email: data.email,
          },
        },
      });

      if (result.error) {
        setError(result.error.message || 'Payment failed');
      } else if (result.paymentIntent?.status === 'succeeded') {
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            address: data.address,
            paymentIntentId: result.paymentIntent.id,
            items: cart,
          }),
        });
        clearCart();
        navigate('/orderSuccess');
      }
    } catch {
      setError('An error occurred. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h2>
        <p className="text-gray-600">Complete your order with AKOMA Apparel</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Cart Summary */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 12a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </h3>

          {(showSummary || typeof window !== 'undefined' && window.innerWidth >= 768) && (
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-semibold mb-6 text-amber-600">🧾 Order Summary</h2>
              <OrderSummary />
            </motion.div>
          )}
          {cart.length === 0 ? (
            <div className="text-center py-6">
              <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p className="text-gray-500 text-base">Your cart is empty</p>
              <p className="text-gray-400 text-sm mt-1">Add some items to your cart to proceed</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center py-2 px-3 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                    <span className="text-gray-500 ml-2 text-sm">× {item.quantity}</span>
                  </div>
                  <span className="font-semibold text-amber-600 text-sm">KES {(Number(item.price) * Number(item.quantity)).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-amber-200 pt-3 mt-3">
                <div className="flex justify-between items-center bg-white rounded-lg py-3 px-3 shadow-sm">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-amber-600">KES {total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Customer Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Customer Information
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                {...register('name')}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 outline-none"
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.name.message}
              </p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
              <input
                type="email"
                {...register('email')}
                className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 outline-none"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 flex items-center">
                <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {errors.email.message}
              </p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Shipping Address</label>
            <textarea
              {...register('address')}
              rows={3}
              className="w-full border-2 border-gray-200 rounded-lg px-4 py-3 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 outline-none resize-none"
              placeholder="Enter your complete shipping address"
            />
            {errors.address && <p className="text-red-500 text-sm mt-1 flex items-center">
              <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.address.message}
            </p>}
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">
            Payment Information
          </h3>
          
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Card Details</label>
            <div className="border-2 border-gray-200 rounded-lg p-4 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-200 transition-all duration-200">
              <CardElement
                options={{ 
                  hidePostalCode: true,
                  style: {
                    base: {
                      fontSize: '16px',
                      color: '#374151',
                      '::placeholder': {
                        color: '#9CA3AF',
                      },
                    },
                  }
                }}
              />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-red-600 text-sm flex items-center">
              <svg className="w-4 h-4 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading || cart.length === 0}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 disabled:from-gray-300 disabled:to-gray-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:cursor-not-allowed text-lg"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing Payment...
            </span>
          ) : cart.length === 0 ? (
            <span className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Cart is Empty
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Complete Order - KES {total.toFixed(2)}
            </span>
          )}
        </button>

        {/* Security Notice */}
        <div className="text-center">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            <svg className="w-3 h-3 mr-1 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Your payment information is secure and encrypted
          </p>
        </div>
      </form>
    </div>
  );
}
