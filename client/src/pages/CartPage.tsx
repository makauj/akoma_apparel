// src/pages/CartPage.tsx
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum: number, item: { price: number; quantity: number; }) => sum + item.price * item.quantity, 0);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">🛒 Your Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between border p-4 rounded-lg shadow-md bg-white"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">KES {item.price.toFixed(2)}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <button
                onClick={() => item._id && removeFromCart(String(item._id))}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-semibold">Total: KES {total.toFixed(2)}</h2>
            <Link
              to="/checkout"
              className="btn-primary"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
