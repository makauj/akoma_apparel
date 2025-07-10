// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

// *** CHANGE THESE LINES ***
import Header from './components/layout/Header.tsx'; // Add .tsx
import Footer from './components/layout/Footer.tsx'; // Add .tsx
import { CartProvider } from './context/CartContext';
// *************************

// Import other pages as you create them
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <Header />
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<ProductListPage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orderSuccess" element={<OrderSuccess/>} />
              <Route path="*" element={
                <div className="flex flex-col items-center justify-center min-h-screen text-center">
                  <div className="bg-white rounded-2xl shadow-xl p-12 max-w-md mx-auto">
                    <svg className="w-24 h-24 mx-auto text-amber-500 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0012 20.5a7.962 7.962 0 01-5.657-2.343L17.172 7.828a3 3 0 00-4.243-4.243L7.828 6.586z" />
                    </svg>
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-xl text-gray-600 mb-6">Page Not Found</p>
                    <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
                    <a href="/" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl">
                      Return Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
