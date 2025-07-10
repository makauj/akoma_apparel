// src/components/layout/OrderSummary.tsx
import { useCart } from '../../context/CartContext';

export default function OrderSummary() {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">🧾 Order Summary</h2>
      {cart.map((item) => (
        <div
          key={item._id}
          className="flex justify-between items-center py-2 border-b last:border-none"
        >
          <div>
            <p className="font-medium">{item.name}</p>
            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
          </div>
          <p className="text-right">KES {(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}

      <div className="flex justify-between items-center mt-4 pt-4 border-t">
        <span className="font-bold text-lg">Total</span>
        <span className="text-lg font-semibold">KES {total.toFixed(2)}</span>
      </div>
    </div>
  );
}
