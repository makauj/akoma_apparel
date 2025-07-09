import { type CartItem } from "../../context/CartContext";
import { useCart } from '../../context/CartContext';

export default function OrderSummary() {
  const { cart } = useCart();

  const subtotal = cart.reduce((acc: number, item: CartItem) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 10000 ? 0 : 500;
  const total = subtotal + shipping;

  return (
    <div className="bg-gradient-to-br from-white to-amber-50 border border-amber-200 rounded-2xl shadow-xl p-8">
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center mr-3">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
      </div>
      
      {cart.length === 0 ? (
        <div className="text-center py-6">
          <svg className="w-12 h-12 mx-auto text-gray-400 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p className="text-gray-500 text-base">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="space-y-3 mb-4">
            {cart.map((item: CartItem) => (
              <div key={item.productId} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">{item.name}</h3>
                    <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
                <span className="font-bold text-amber-600 text-sm">KES {(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="space-y-3 pt-6 border-t border-amber-200">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-gray-900">KES {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold text-gray-900">
                {shipping === 0 ? (
                  <span className="text-green-600">Free</span>
                ) : (
                  `KES ${shipping.toFixed(2)}`
                )}
              </span>
            </div>
            {shipping === 0 && (
              <div className="flex items-center text-xs text-green-600">
                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Free shipping on orders over KES 10,000
              </div>
            )}
            <div className="flex justify-between items-center py-3 px-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg text-white font-bold text-lg">
              <span>Total</span>
              <span>KES {total.toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
