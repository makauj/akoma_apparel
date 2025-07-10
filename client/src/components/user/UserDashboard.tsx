import React, { useState, useEffect } from 'react';
import { useAuth, ProtectedRoute } from '../../contexts/AuthContext';
import { apiClient, handleApiError } from '../../utils/api';

interface Order {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: Array<{
    product: {
      name: string;
      price: number;
    };
    quantity: number;
  }>;
}

function Dashboard() {
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.getUserOrders();
      
      if (response.success && response.data) {
        setOrders(response.data);
      } else {
        setError(handleApiError(response.error));
      }
    } catch (err) {
      setError('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Welcome, {user?.name}!</h5>
              <p className="card-text text-muted">{user?.email}</p>
              <div className="d-grid gap-2">
                <a href="/cart" className="btn btn-primary">View Cart</a>
                <a href="/products" className="btn btn-outline-primary">Shop Products</a>
                <button className="btn btn-outline-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-9">
          <h2 className="mb-4">Order History</h2>
          
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {orders.length === 0 ? (
            <div className="text-center">
              <p className="text-muted">No orders found.</p>
              <a href="/products" className="btn btn-primary">Start Shopping</a>
            </div>
          ) : (
            <div className="row">
              {orders.map((order) => (
                <div key={order._id} className="col-12 mb-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h6 className="card-title">Order #{order._id.slice(-8)}</h6>
                          <p className="text-muted small">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-end">
                          <span className={`badge ${
                            order.status === 'completed' ? 'bg-success' :
                            order.status === 'pending' ? 'bg-warning' :
                            order.status === 'cancelled' ? 'bg-danger' :
                            'bg-info'
                          }`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                          <p className="mb-0 mt-2">
                            <strong>${order.totalAmount.toFixed(2)}</strong>
                          </p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <h6 className="text-muted small">Items:</h6>
                        {order.items.map((item, index) => (
                          <div key={index} className="d-flex justify-content-between">
                            <span>{item.product.name} × {item.quantity}</span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UserDashboard() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
