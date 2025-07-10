import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category?: string;
  stock?: number;
  sku?: string;
  brand?: string;
  dimensions?: string;
  weight?: number;
  reviews?: Review[];
}

interface Review {
  author: string;
  rating: number;
  comment: string;
}

const ProductDetailPage: React.FC = () => {
    const { id: productId } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const API_BASE_URL = import.meta.env.PUBLIC_API_BASE_URL || 'http://localhost:5000';
            const response = await fetch(`${API_BASE_URL}/api/products/${productId}`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch product details.');
            }
            
            const data: Product = await response.json();
            setProduct(data);
        } catch (err: any) {
            setError(err.message || 'An error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleAddToCart = (product: Product) => {
        // Add to cart logic here
        console.log('Adding to cart:', product);
        // You can implement cart logic here or call your cart API
        alert(`Added ${product.name} to cart!`);
    };

    useEffect(() => {
        if (productId) {
            fetchProduct();
        }
    }, [productId]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
    }

    if (!product) {
        return <div className="not-found">Product not found.</div>;
    }

    return (
        <div className="product-detail">
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            
            <div className="product-images">
                {product.images?.map((image, index) => (
                    <img key={index} src={image} alt={`${product.name} image ${index + 1}`} />
                ))}
            </div>
            
            <div className="product-details">
                {product.category && <p>Category: {product.category}</p>}
                {product.stock !== undefined && (
                    <p>Stock: {product.stock > 0 ? `${product.stock} items available` : 'Out of stock'}</p>
                )}
            </div>
            
            <button 
                className="add-to-cart-button" 
                onClick={() => handleAddToCart(product)}
                disabled={product.stock === 0}
            >
                {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            {(product.sku || product.brand || product.dimensions || product.weight) && (
                <div className="additional-info">
                    <h2>Additional Information</h2>
                    {product.sku && <p>SKU: {product.sku}</p>}
                    {product.brand && <p>Brand: {product.brand}</p>}
                    {product.dimensions && <p>Dimensions: {product.dimensions}</p>}
                    {product.weight && <p>Weight: {product.weight} kg</p>}
                </div>
            )}
            
            <div className="reviews-section">
                <h2>Customer Reviews</h2>
                {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((review, index) => (
                        <div key={index} className="review">
                            <p><strong>{review.author}</strong> ({review.rating}/5)</p>
                            <p>{review.comment}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet. Be the first to review this product!</p>
                )}
            </div>
            
            <div className="related-products">
                <h2>Related Products</h2>
                {relatedProducts.length > 0 ? (
                    relatedProducts.map((relatedProduct, index) => (
                        <div key={index} className="related-product">
                            <img 
                                src={relatedProduct.images?.[0] || '/images/placeholder.jpg'} 
                                alt={relatedProduct.name} 
                            />
                            <p>{relatedProduct.name}</p>
                            <p>Price: ${relatedProduct.price.toFixed(2)}</p>
                        </div>
                    ))
                ) : (
                    <p>No related products available.</p>
                )}
            </div>
        </div>
    );
};

export default ProductDetailPage;
