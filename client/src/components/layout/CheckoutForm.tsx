import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

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
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Calculate total from cart items
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalInCents = Math.round(total * 100); // Convert to cents for Stripe

  const onSubmit = async (data: CheckoutFormData) => {
    setLoading(true);
    setError('');

    if (!stripe || !elements) return;

    // Check if cart is empty
    if (cart.length === 0) {
      setError('Your cart is empty');
      setLoading(false);
      return;
    }

    try {
      // 1. Create payment intent with actual cart total
      const res = await fetch('/api/payments/intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: totalInCents }),
      });
      const { clientSecret } = await res.json();

      // 2. Confirm card payment
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
        // 3. Create order with cart items
        await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: data.name,
            email: data.email,
            address: data.address,
            paymentIntentId: result.paymentIntent.id,
            items: cart,
            total: total,
          }),
        });

        // 4. Clear cart and redirect to success page
        clearCart();
        navigate('/order-success');
      }
    } catch {
      setError('An error occurred. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Cart Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Order Summary</h3>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty</p>
        ) : (
          <>
            {cart.map((item) => (
              <div key={item.productId} className="flex justify-between py-1">
                <span>{item.name} x {item.quantity}</span>
                <span>KES {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t pt-2 mt-2 font-bold">
              <div className="flex justify-between">
                <span>Total:</span>
                <span>KES {total.toFixed(2)}</span>
              </div>
            </div>
          </>
        )}
      </div>

      <div>
        <label className="block font-medium">Full Name</label>
        <input
          type="text"
          {...register('name')}
          className="w-full border rounded px-3 py-2"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <input
          type="email"
          {...register('email')}
          className="w-full border rounded px-3 py-2"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Shipping Address</label>
        <textarea
          {...register('address')}
          className="w-full border rounded px-3 py-2"
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Card Details</label>
        <div className="border p-3 rounded">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={!stripe || loading || cart.length === 0}
        className="w-full bg-black text-white px-6 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
      >
        {loading ? 'Processing...' : cart.length === 0 ? 'Cart is Empty' : `Place Order - KES ${total.toFixed(2)}`}
      </button>
    </form>
  );
}
