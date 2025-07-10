import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <div className="card shadow-lg">
            <div className="card-body p-5">
              {/* Success Icon */}
              <div className="mb-4">
                <div className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px' }}>
                  <i className="fas fa-check fa-2x text-white"></i>
                </div>
              </div>

              {/* Success Message */}
              <h1 className="h2 text-success mb-3">Order Placed Successfully!</h1>
              <p className="lead text-muted mb-4">
                Thank you for your purchase. Your order has been confirmed and will be processed shortly.
              </p>

              {/* Order Details */}
              <div className="bg-light rounded p-4 mb-4">
                <div className="row text-start">
                  <div className="col-md-6">
                    <h6 className="fw-bold">Order Number</h6>
                    <p className="mb-2">#AK-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                    
                    <h6 className="fw-bold">Order Date</h6>
                    <p className="mb-2">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">Estimated Delivery</h6>
                    <p className="mb-2">
                      {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </p>
                    
                    <h6 className="fw-bold">Total Amount</h6>
                    <p className="mb-2 text-success fw-bold">$118.97</p>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="text-start mb-4">
                <h5 className="mb-3">What happens next?</h5>
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>
                        1
                      </div>
                      <div>
                        <h6 className="mb-1">Order Confirmation</h6>
                        <small className="text-muted">You'll receive an email confirmation shortly</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>
                        2
                      </div>
                      <div>
                        <h6 className="mb-1">Processing</h6>
                        <small className="text-muted">We'll prepare your order for shipping</small>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 mb-3">
                    <div className="d-flex align-items-start">
                      <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: '30px', height: '30px', fontSize: '14px' }}>
                        3
                      </div>
                      <div>
                        <h6 className="mb-1">Shipping</h6>
                        <small className="text-muted">Your order will be shipped within 2-3 business days</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                <button
                  className="btn btn-primary"
                  onClick={() => navigate('/')}
                >
                  Continue Shopping
                </button>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => alert('Order tracking feature coming soon!')}
                >
                  Track Your Order
                </button>
              </div>

              {/* Contact Info */}
              <div className="mt-4 pt-4 border-top">
                <p className="text-muted mb-0">
                  Need help? Contact our customer service at{' '}
                  <a href="mailto:support@akomaapparel.com">support@akomaapparel.com</a>
                  {' '}or call <a href="tel:+1234567890">(123) 456-7890</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
