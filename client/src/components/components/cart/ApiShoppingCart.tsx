import React, { useState, useEffect } from 'react';
import { apiClient, type Product, handleApiError } from '../../../utils/api';
import ApiProductCartItem from './ApiProductCartItem';
import OrderSummary from './orderSummary';

interface CartItem {
  product: Product;
  quantity: number;
  price: number;
}

interface CartResponse {
  items: CartItem[];
  totalAmount: number;
  totalItems: number;
}

export default function ApiShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null); // Track which item is being updated

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getCart();
      
      if (response.success && response.data) {
        const cartData = response.data as CartResponse;
        setCartItems(cartData.items || []);
      } else {
        setError(handleApiError(response.error));
      }
    } catch (err) {
      setError('Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    setUpdating(productId);
    
    try {
      const response = await apiClient.updateCartItem(productId, quantity);
      
      if (response.success) {
        // Refresh cart after update
        await fetchCart();
      } else {
        setError(handleApiError(response.error));
      }
    } catch (err) {
      setError('Failed to update cart item');
    } finally {
      setUpdating(null);
    }
  };

  const removeItem = async (productId: string) => {
    setUpdating(productId);
    
    try {
      const response = await apiClient.removeFromCart(productId);
      
      if (response.success) {
        // Refresh cart after removal
        await fetchCart();
      } else {
        setError(handleApiError(response.error));
      }
    } catch (err) {
      setError('Failed to remove cart item');
    } finally {
      setUpdating(null);
    }
  };

  const clearCart = async () => {
    setLoading(true);
    
    try {
      const response = await apiClient.clearCart();
      
      if (response.success) {
        setCartItems([]);
      } else {
        setError(handleApiError(response.error));
      }
    } catch (err) {
      setError('Failed to clear cart');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      const items = cartItems.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
        price: item.price
      }));
      
      const response = await apiClient.createCheckoutSession(items);
      
      if (response.success && response.data?.url) {
        // Redirect to Stripe checkout
        window.location.href = response.data.url;
      } else {
        alert(handleApiError(response.error));
      }
    } catch (err) {
      alert('Failed to start checkout process');
    }
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your cart...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Error!</h4>
          <p>{error}</p>
          <button className="btn btn-outline-danger" onClick={fetchCart}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2 className="mb-3">Your Cart is Empty</h2>
          <p className="mb-4">Looks like you haven't added any items to your cart yet.</p>
          <a href="/products" className="btn btn-primary">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  const subtotal = calculateSubtotal();

  return (
    <>
      <div className="container mt-5">
        <h2 className="mb-3 text-center">Shopping Cart</h2>
        <h5 className="text-center mb-5">You are eligible for Free Shipping.</h5>
        
        {error && (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            {error}
            <button 
              type="button" 
              className="btn-close" 
              onClick={() => setError(null)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="row">
          <div className="col-12 col-lg-7">
            {cartItems.map((item, i) => (
              <React.Fragment key={item.product.id}>
                {i !== 0 && <hr className="horizontal dark my-4" />}
                <div className="position-relative">
                  {updating === item.product.id && (
                    <div className="position-absolute top-50 start-50 translate-middle bg-white d-flex align-items-center justify-content-center" 
                         style={{ zIndex: 10, width: '100%', height: '100%', opacity: 0.8 }}>
                      <div className="spinner-border spinner-border-sm" role="status">
                        <span className="visually-hidden">Updating...</span>
                      </div>
                    </div>
                  )}
                  <ApiProductCartItem
                    thumb_src={item.product.thumb_src}
                    thumb_alt={item.product.thumb_alt}
                    title={item.product.title}
                    color={item.product.color || 'Default'}
                    size={item.product.size || 'One Size'}
                    price={item.price}
                    stock={item.product.stock || true}
                    quantity={item.quantity}
                    onUpdateQuantity={(newQuantity) => updateQuantity(item.product.id, newQuantity)}
                    onRemove={() => removeItem(item.product.id)}
                  />
                </div>
              </React.Fragment>
            ))}
            
            <div className="mt-4">
              <button 
                className="btn btn-outline-danger me-2" 
                onClick={clearCart}
                disabled={loading}
              >
                Clear Cart
              </button>
              <a href="/products" className="btn btn-outline-primary">
                Continue Shopping
              </a>
            </div>
          </div>
          
          <div className="col-12 col-lg-5 mt-5 mt-lg-0">
            <div className="card shadow-xs border bg-gray-100">
              <div className="card-body p-lg-5">
                <h5 className="mb-4">Order Summary</h5>
                <OrderSummary 
                  subtotal={subtotal}
                  textColor="dark"
                />
                <button 
                  className="btn btn-dark btn-lg w-100 mb-2"
                  onClick={handleCheckout}
                  disabled={cartItems.length === 0}
                >
                  Checkout
                </button>
                <a href="/products" className="btn btn-white btn-lg w-100">
                  Continue Shopping
                </a>
                <p className="text-center mt-3">Tax included. Shipping calculated at checkout.</p>
              </div>
            </div>
            
            <p className="d-flex align-items-center justify-content-center text-body mt-4"> 
              <svg className="me-2" width="11" height="13" viewBox="0 0 11 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3.21652 6.14286H7.78795V4.42857C7.78795 3.79762 7.56473 3.25893 7.1183 2.8125C6.67188 2.36607 6.13318 2.14286 5.50223 2.14286C4.87128 2.14286 4.33259 2.36607 3.88616 2.8125C3.43973 3.25893 3.21652 3.79762 3.21652 4.42857V6.14286ZM10.6451 7V12.1429C10.6451 12.381 10.5618 12.5833 10.3951 12.75C10.2284 12.9167 10.026 13 9.78795 13H1.21652C0.978423 13 0.776042 12.9167 0.609375 12.75C0.442708 12.5833 0.359375 12.381 0.359375 12.1429V7C0.359375 6.7619 0.442708 6.55952 0.609375 6.39286C0.776042 6.22619 0.978423 6.14286 1.21652 6.14286H1.50223V4.42857C1.50223 3.33333 1.89509 2.39286 2.6808 1.60714C3.46652 0.821428 4.40699 0.428571 5.50223 0.428571C6.59747 0.428571 7.53795 0.821428 8.32366 1.60714C9.10938 2.39286 9.50223 3.33333 9.50223 4.42857V6.14286H9.78795C10.026 6.14286 10.2284 6.22619 10.3951 6.39286C10.5618 6.55952 10.6451 6.7619 10.6451 7Z" fill="#495057"/>
              </svg>
              Secured Payment with:
            </p>
            
            <div className="d-flex justify-content-center">
              <svg className="me-2" width="31" height="21" viewBox="0 0 31 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M26.5173 11.6875H24.6691C24.7941 11.3571 25.0887 10.558 25.553 9.29018L25.5932 9.16964C25.6289 9.08036 25.6735 8.96429 25.7271 8.82143C25.7807 8.67857 25.8209 8.5625 25.8477 8.47321L26.0084 9.20982L26.5173 11.6875ZM7.17801 10.817L6.40123 6.86607C6.30301 6.38393 5.96819 6.14286 5.39676 6.14286H1.80748L1.78069 6.31696C4.55748 7.02232 6.35659 8.52232 7.17801 10.817ZM9.57534 6.14286L7.40569 12.0089L7.17801 10.817C6.94587 10.192 6.56641 9.61607 6.03962 9.08929C5.51284 8.55357 4.92801 8.15625 4.28516 7.89732L6.09319 14.7277H8.43694L11.9325 6.14286H9.57534ZM11.4369 14.7411H13.6602L15.053 6.14286H12.8298L11.4369 14.7411ZM21.7227 6.35714C21.1066 6.11607 20.4414 5.99553 19.7271 5.99553C18.6289 5.99553 17.7316 6.25893 17.0352 6.78571C16.3387 7.3125 15.986 7.99554 15.9771 8.83482C15.9682 9.74554 16.6155 10.5223 17.9191 11.1652C18.3477 11.3705 18.6468 11.5536 18.8164 11.7143C18.9861 11.875 19.0709 12.0491 19.0709 12.2366C19.0709 12.5045 18.9369 12.7098 18.6691 12.8527C18.4012 12.9955 18.0932 13.067 17.745 13.067C16.9771 13.067 16.2807 12.9196 15.6557 12.625L15.3611 12.4777L15.053 14.4062C15.7137 14.7098 16.5396 14.8616 17.5307 14.8616C18.6914 14.8705 19.62 14.6071 20.3164 14.0714C21.0218 13.5357 21.3834 12.8214 21.4012 11.9286C21.4012 10.9821 20.7762 10.2054 19.5262 9.59821C19.0887 9.375 18.7718 9.1875 18.5753 9.03571C18.3789 8.88393 18.2807 8.71429 18.2807 8.52678C18.2807 8.33036 18.3878 8.16071 18.6021 8.01786C18.8253 7.86607 19.1423 7.79018 19.553 7.79018C20.178 7.78125 20.7316 7.88839 21.2137 8.11161L21.4146 8.21875L21.7227 6.35714ZM27.4146 6.14286H25.7003C25.12 6.14286 24.7316 6.38393 24.5352 6.86607L21.2405 14.7411H23.5709L24.0396 13.4554H26.8789C26.9235 13.6518 27.0128 14.0804 27.1468 14.7411H29.2093L27.4146 6.14286ZM30.9236 1.85714V19C30.9236 19.4643 30.7539 19.8661 30.4146 20.2054C30.0753 20.5446 29.6736 20.7143 29.2093 20.7143H1.78069C1.31641 20.7143 0.914621 20.5446 0.575335 20.2054C0.236049 19.8661 0.0664062 19.4643 0.0664062 19V1.85714C0.0664062 1.39286 0.236049 0.991071 0.575335 0.651785C0.914621 0.312499 1.31641 0.142856 1.78069 0.142856H29.2093C29.6736 0.142856 30.0753 0.312499 30.4146 0.651785C30.7539 0.991071 30.9236 1.39286 30.9236 1.85714Z" fill="#495057"/>
              </svg>
              {/* Additional payment method SVGs... */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
