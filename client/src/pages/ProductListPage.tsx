// src/pages/ProductListPage.tsx
import React, { useState, useEffect } from 'react';
import { Filter, Star, ShoppingCart, Heart, Search } from 'lucide-react';

// Define the interface for a single product
interface IProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
}

// Define the interface for an item in the cart (includes quantity)
interface ICartItem extends IProduct {
  quantity: number;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [sortBy, setSortBy] = useState('name');
  const [cartItems, setCartItems] = useState<ICartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Mock product data - replace with API call later
  const mockProducts: IProduct[] = [
    {
      id: 1,
      name: "Traditional Kente Dress",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
      category: "Dresses",
      rating: 4.5,
      reviews: 24,
      description: "Beautiful traditional Kente pattern dress with modern cut"
    },
    {
      id: 2,
      name: "Ankara Print Shirt",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=400&fit=crop",
      category: "Shirts",
      rating: 4.2,
      reviews: 18,
      description: "Vibrant Ankara print shirt perfect for any occasion"
    },
    {
      id: 3,
      name: "Dashiki Top",
      price: 35.99,
      image: "https://images.unsplash.com/photo-1585487000143-66b1526316ce?w=400&h=400&fit=crop",
      category: "Tops",
      rating: 4.8,
      reviews: 31,
      description: "Authentic Dashiki top with intricate embroidery"
    },
    {
      id: 4,
      name: "Kente Robe",
      price: 120.99,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      category: "Robes",
      rating: 4.6,
      reviews: 12,
      description: "Luxurious Kente robe for special occasions"
    },
    {
      id: 5,
      name: "Ankara Skirt",
      price: 52.99,
      image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
      category: "Skirts",
      rating: 4.3,
      reviews: 28,
      description: "Elegant Ankara print skirt with flowing design"
    },
    {
      id: 6,
      name: "Kente Accessories Set",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=400&h=400&fit=crop",
      category: "Accessories",
      rating: 4.4,
      reviews: 15,
      description: "Complete accessories set with Kente patterns"
    }
  ];

  const categories = ['All Products', 'Dresses', 'Shirts', 'Tops', 'Robes', 'Skirts', 'Accessories'];

  useEffect(() => {
    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const addToCart = (product: IProduct) => { // Type product as IProduct
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }]; // Ensure new item is ICartItem
    });
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section (Keep this if you want a second hero specifically for products page) */}
      <section className="bg-gradient-to-r from-orange-400 to-red-500 text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-2">Authentic African Fashion</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Discover beautiful traditional and modern African attire crafted with love and authenticity
          </p>
        </div>
      </section>

      {/* Filters and Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-700 font-medium">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="name">Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCategory}</h3>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      wishlist.includes(product.id) ? 'text-red-500 fill-current' : 'text-gray-500'
                    }`}
                  />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {renderStars(product.rating)}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <button
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListPage;
