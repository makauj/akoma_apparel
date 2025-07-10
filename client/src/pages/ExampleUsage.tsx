// Example usage of CardProduct and ProductListPage components

import React from 'react';
import CardProduct from './cardProduct';
import ProductListPage from './pages/ProductListPage';

// Example of using CardProduct with a single product
const sampleProduct = {
  id: "1",
  title: "Premium Cotton T-Shirt",
  price: 29.99,
  description: "Soft and comfortable premium cotton t-shirt perfect for everyday wear.",
  thumb_src: "/images/tshirt-blue.jpg",
  thumb_alt: "Blue cotton t-shirt",
  color: "Blue",
  colors: ["Blue", "Red", "Green", "White"],
  rating: 4.5,
  reviews: 128,
  stock: true
};

// Single Card Example
export const SingleCardExample: React.FC = () => {
  const handleProductClick = (productId: string) => {
    console.log('Product clicked:', productId);
    // Navigate to product detail page
  };

  const handleAddToCart = (product: any) => {
    console.log('Add to cart:', product);
    alert(`Added ${product.title} to cart!`);
  };

  return (
    <div className="container mt-4">
      <h2>Single Product Card Example</h2>
      <div className="row">
        <div className="col-md-4">
          <CardProduct
            product={sampleProduct}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            showAddToCart={true}
          />
        </div>
      </div>
    </div>
  );
};

// Product List Example
export const ProductListExample: React.FC = () => {
  return (
    <div className="container mt-4">
      <h2>Product List Example</h2>
      <ProductListPage 
        category="clothing" // optional filter by category
      />
    </div>
  );
};

// Full Page Example
export const FullPageExample: React.FC = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
        <div className="container">
          <span className="navbar-brand">Akoma Apparel</span>
        </div>
      </nav>
      
      <ProductListExample />
      
      <hr className="my-5" />
      
      <SingleCardExample />
    </div>
  );
};

export default FullPageExample;
