import React from 'react';

// Use the existing Product interface from the API
interface Product {
  id: string;
  title: string;
  price: number;
  description?: string;
  thumb_src: string;
  thumb_alt: string;
  color?: string;
  colors?: string[];
  images?: Array<{ src: string; alt: string }>;
  rating?: number;
  reviews?: number;
  stock?: boolean;
  size?: string;
  sizes?: Record<string, number>;
}

interface CardProductProps {
  product: Product;
  onProductClick?: (productId: string) => void;
  onAddToCart?: (product: Product) => void;
  className?: string;
  showAddToCart?: boolean;
}

const CardProduct: React.FC<CardProductProps> = ({
  product,
  onProductClick,
  onAddToCart,
  className = '',
  showAddToCart = true
}) => {
  const handleProductClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onProductClick) {
      onProductClick(product.id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const isOutOfStock = product.stock === false;
  const primaryImage = product.thumb_src || '/images/placeholder.jpg';

  return (
    <div className={`card card-product border mb-4 shadow-sm border-radius-lg h-100 ${className}`}>
      <div 
        className="card-clickable" 
        onClick={handleProductClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="position-relative">
          <div className="height-250 overflow-hidden">
            <img 
              className="w-100 h-100 object-cover rounded-top" 
              src={primaryImage}
              alt={product.thumb_alt || product.title}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
          </div>
          
          {/* Stock badge */}
          {isOutOfStock && (
            <div className="position-absolute top-0 end-0 m-2">
              <span className="badge bg-danger">Out of Stock</span>
            </div>
          )}
          
          {/* Color badge */}
          {product.color && (
            <div className="position-absolute top-0 start-0 m-2">
              <span className="badge bg-primary">{product.color}</span>
            </div>
          )}
        </div>

        <div className="card-body d-flex flex-column">
          {/* Product Name */}
          <h5 className="card-title font-weight-bold mb-2 text-truncate">
            {product.title}
          </h5>

          {/* Description */}
          <p className="card-text text-body text-sm mb-2 flex-grow-1">
            {product.description && product.description.length > 100 
              ? `${product.description.substring(0, 100)}...` 
              : product.description || 'No description available'}
          </p>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-2">
              <small className="text-muted">Colors:</small>
              <div className="d-flex gap-1 mt-1">
                {product.colors.slice(0, 4).map((color, index) => (
                  <span 
                    key={index}
                    className="badge border"
                    style={{ 
                      backgroundColor: color.toLowerCase(),
                      color: color.toLowerCase() === 'white' ? '#000' : '#fff',
                      minWidth: '20px',
                      height: '20px'
                    }}
                    title={color}
                  />
                ))}
                {product.colors.length > 4 && (
                  <span className="badge bg-light text-dark">
                    +{product.colors.length - 4}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Rating */}
          {product.rating && (
            <div className="mb-2">
              <div className="d-flex align-items-center">
                <div className="stars me-2">
                  {[...Array(5)].map((_, i) => (
                    <i 
                      key={i}
                      className={`fas fa-star ${i < product.rating! ? 'text-warning' : 'text-muted'}`}
                    />
                  ))}
                </div>
                <small className="text-muted">
                  {product.reviews && `(${product.reviews} reviews)`}
                </small>
              </div>
            </div>
          )}

          {/* Price and Actions */}
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <div>
              <h4 className="mb-0 text-primary font-weight-bold">
                ${product.price.toFixed(2)}
              </h4>
              <small className="text-muted">
                {product.stock ? 'In stock' : 'Out of stock'}
              </small>
            </div>

            {showAddToCart && (
              <button 
                className={`btn btn-sm ${isOutOfStock ? 'btn-outline-secondary' : 'btn-primary'}`}
                onClick={handleAddToCart}
                disabled={isOutOfStock}
                title={isOutOfStock ? 'Out of stock' : 'Add to cart'}
              >
                {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
