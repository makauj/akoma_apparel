import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';

export default function OrderSuccess() {
  const { clearCart } = useCart();

  // Clear cart on load
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="max-w-2xl mx-auto p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">🎉 Thank You for Your Order!</h1>
      <p className="mb-6 text-gray-700">Your payment was successful and your order has been placed.</p>
      <Link
        to="/shop"
        className="inline-block bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
