import React, { useState, useEffect } from "react";
import { Heart, Star, Filter } from "lucide-react";
import { Header } from "../../components/shared/DesktopHeader";
import DesktopFooter from "../../components/shared/DesktopFooter";

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
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const mockProducts: Product[] = [
    {
      id: 1,
      name: "Kente Dress",
      price: 89.99,
      category: "dresses",
      image: "https://via.placeholder.com/300x400/FF6B35/FFFFFF?text=Kente+Dress",
      rating: 4.5,
      reviews: 24,
      description: "Traditional Kente pattern dress with modern cut",
    },
    {
      id: 2,
      name: "Ankara Shirt",
      price: 45.99,
      category: "shirts",
      image: "https://via.placeholder.com/300x400/FF6B35/FFFFFF?text=Ankara+Shirt",
      rating: 4.2,
      reviews: 18,
      description: "Vibrant Ankara print shirt for men",
    },
  ];

  const categories: Category[] = [
    { id: "all", name: "All Products" },
    { id: "dresses", name: "Dresses" },
    { id: "shirts", name: "Shirts" },
    { id: "tops", name: "Tops" },
    { id: "robes", name: "Robes" },
    { id: "skirts", name: "Skirts" },
    { id: "accessories", name: "Accessories" },
    { id: "jackets", name: "Jackets" },
    { id: "pants", name: "Pants" },
    { id: "tunics", name: "Tunics" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setTimeout(() => {
        setProducts(mockProducts);
        setLoading(false);
      }, 1000);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    console.log("Added to cart:", product);
  };

  const addToWishlist = (product: Product) => {
    console.log("Added to wishlist:", product);
  };

  return (
    <div className="min-h-[100vh] flex flex-col bg-gray-50 overflow-x-hidden">
      <Header />

      <main className="flex-grow">
        {/* Hero */}
        <section className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-16">
          <div className="max-w-[1440px] mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Authentic African Fashion</h2>
            <p className="text-xl mb-6">
              Discover beautiful traditional and modern African attire
            </p>
            <button className="bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Shop Now
            </button>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-white py-6 border-b sticky top-0 z-40">
          <div className="max-w-[1440px] mx-auto px-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-700 font-medium">Categories:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category.id
                        ? "bg-orange-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="py-12">
          <div className="max-w-[1440px] mx-auto px-4">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "all"
                  ? "All Products"
                  : categories.find((c) => c.id === selectedCategory)?.name}
              </h3>
              <p className="text-gray-600">
                {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""} found
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover"
                    />
                    <button
                      onClick={() => addToWishlist(product)}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition"
                    >
                      <Heart className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>

                  <div className="p-4">
                    <h4 className="text-lg font-semibold text-gray-900 mb-1">
                      {product.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {product.description}
                    </p>

                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
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
                        ${product.price}
                      </span>
                      <button
                        onClick={() => addToCart(product)}
                        className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <DesktopFooter />
    </div>
  );
};

export default ProductListPage;
