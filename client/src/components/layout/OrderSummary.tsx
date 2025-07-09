import { type CartItem } from "../../context/CartContext";
import { useCart } from '../../context/CartContext';

export default function OrderSummary() {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="bg-gray-50 p-6 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <ul className="space-y-2">
        {cart.map((item: CartItem) => (
          <li key={item.productId} className="flex justify-between text-sm">
            <span>{item.name} x {item.quantity}</span>
            <span>KES {item.price * item.quantity}</span>
          </li>
        ))}
        <li className="flex justify-between pt-2 border-t">
          <span>Subtotal</span>
          <span>KES {subtotal}</span>
        </li>
        <li className="flex justify-between">
          <span>Shipping</span>
          <span>KES {shipping}</span>
        </li>
        <li className="flex justify-between font-bold border-t pt-2">
          <span>Total</span>
          <span>KES {total}</span>
        </li>
      </ul>
    </div>
  );
}
