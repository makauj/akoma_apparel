import React, { useState, useEffect } from 'react';
import { apiClient, type Product, handleApiError } from '../../../utils/api';
import CardProduct from './cardProduct';

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

  const handleAddToCart = async (productId: string) => {
    try {
      const response = await apiClient.addToCart(productId);
      
      if (response.success) {
        // Show success message or update cart UI
        alert('Product added to cart!');
      } else {
        alert(handleApiError(response.error));
      }
    } catch (err) {
      alert('Failed to add product to cart');
    }
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
            thumb_src={product.thumb_src}
            thumb_alt={product.thumb_alt}
            color={product.color || ""}
            colors={product.colors || []}
            title={product.title}
            description={product.description || ""}
            price={product.price}
            position="center"
          />
          <button 
            className="btn btn-primary mt-2 w-100"
            onClick={() => handleAddToCart(product.id)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
