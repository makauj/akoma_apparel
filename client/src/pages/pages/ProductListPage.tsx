import React, { useState, useEffect } from 'react';
import { apiClient, type Product, handleApiError } from '../../utils/api';
import CardProduct from '../cardProduct';

interface ProductListProps {
  category?: string;
}

export default function ProductList({ category }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await apiClient.getProducts({ category });
      
      if (response.success && response.data) {
        setProducts(response.data);
      } else {
        setError(handleApiError(response.error));
      }
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product: Product) => {
    try {
      const response = await apiClient.addToCart(product.id);
      
      if (response.success) {
        // Show success message or update cart UI
        alert(`Added ${product.title} to cart!`);
      } else {
        alert(handleApiError(response.error));
      }
    } catch (err) {
      alert('Failed to add product to cart');
    }
  };

  const handleProductClick = (productId: string) => {
    // Navigate to product detail page
    console.log('Navigate to product:', productId);
    // You can implement navigation logic here
    // For example: window.location.href = `/products/${productId}`;
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <h4 className="alert-heading">Error</h4>
        <p>{error}</p>
        <button 
          className="btn btn-outline-danger" 
          onClick={fetchProducts}
        >
          Try Again
        </button>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-5">
        <h3>No products found</h3>
        <p className="text-muted">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="row">
      {products.map(product => (
        <div key={product.id} className="col-md-6 col-lg-3 mb-4">
          <CardProduct 
            product={product}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            showAddToCart={true}
          />
        </div>
      ))}
    </div>
  );
}
