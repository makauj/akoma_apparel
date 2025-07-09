import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Heart, Star, Filter } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  description: string;
}

interface Category {
  id: string;
  name: string;
}

const ProductListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart, cart } = useCart();

  // Calculate cart count from cart items
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // Mock data for demonstration - replace with actual API call
  const categories: Category[] = [
    { id: 'all', name: 'All Products' },
    { id: 'dresses', name: 'Dresses' },
    { id: 'shirts', name: 'Shirts' },
    { id: 'tops', name: 'Tops' },
    { id: 'robes', name: 'Robes' },
    { id: 'skirts', name: 'Skirts' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const handleAddToCart = (product: Product) => {
    addToCart({
      productId: product.id.toString(),
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.image
    });
  };

  // Simulate API call to your backend
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: 1,
        name: "Kente Dress",
        price: 4500,
        category: "dresses",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
        rating: 4.5,
        reviews: 24,
        description: "Traditional Kente pattern dress with modern cut"
      },
      {
        id: 2,
        name: "Ankara Shirt",
        price: 2800,
        category: "shirts",
        image: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400&h=500&fit=crop",
        rating: 4.2,
        reviews: 18,
        description: "Vibrant Ankara print shirt for men"
      },
      {
        id: 3,
        name: "Dashiki Top",
        price: 2200,
        category: "tops",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=500&fit=crop",
        rating: 4.7,
        reviews: 31,
        description: "Colorful Dashiki top with traditional embroidery"
      },
      {
        id: 4,
        name: "Agbada Robe",
        price: 7800,
        category: "robes",
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
        rating: 4.8,
        reviews: 12,
        description: "Elegant traditional Agbada robe for special occasions"
      },
      {
        id: 5,
        name: "Mud Cloth Skirt",
        price: 3400,
        category: "skirts",
        image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop",
        rating: 4.3,
        reviews: 22,
        description: "Authentic Mud Cloth patterned skirt"
      },
      {
        id: 6,
        name: "Kente Headwrap",
        price: 800,
        category: "accessories",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=500&fit=crop",
        rating: 4.6,
        reviews: 15,
        description: "Beautiful Kente headwrap for styling"
      }
    ];

    const fetchProducts = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual API call to your backend
        // const response = await fetch('/api/products');
        // const data = await response.json();
        // setProducts(data);
        
        // For now, using mock data
        setTimeout(() => {
          setProducts(mockProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToWishlist = (product: Product) => {
    // TODO: Call your backend API to add to wishlist
    console.log('Added to wishlist:', product);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-amber-500 to-orange-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Authentic African Fashion</h2>
          <p className="text-xl mb-8">Discover beautiful traditional and modern African attire</p>
          <button className="bg-white text-amber-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Shop Now
          </button>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="bg-white py-6 border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center">
              <Filter className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Categories:</span>
            </div>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Products' : categories.find(c => c.id === selectedCategory)?.name}
            </h3>
            <p className="text-gray-600">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => addToWishlist(product)}
                    className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
                  >
                    <Heart className="h-5 w-5 text-gray-600" />
                  </button>
                </div>
                
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h4>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating) 
                              ? 'text-yellow-400 fill-current' 
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-600">
                      KES {product.price.toLocaleString()}
                    </span>
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
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
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">AKOMA Apparel</h4>
              <p className="text-gray-400">
                Bringing you authentic African fashion with a modern twist.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Shipping</a></li>
                <li><a href="#" className="hover:text-white">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Dresses</a></li>
                <li><a href="#" className="hover:text-white">Shirts</a></li>
                <li><a href="#" className="hover:text-white">Accessories</a></li>
                <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <p className="text-gray-400">
                Stay connected for the latest updates and new arrivals.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
            <p>&copy; 2024 AKOMA Apparel. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductListPage;
