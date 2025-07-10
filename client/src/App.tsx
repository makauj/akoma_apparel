import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Pages
import DesktopRegister from './pages/auth/DesktopSignup';
import DesktopSignin from './pages/auth/DesktopLogin';
import EmailVerificationPage from './pages/auth/EmailVerPage';
import WelcomeMessage from './pages/auth/WelcomePage';

// Other Pages
import SearchPage01 from './pages/search/SearchPage01';
import CartPage from './pages/checkout/CartPage';
import ShippingPage from './pages/checkout/ShippingPage';

// Optional shared layout
// import DesktopHeader from './components/shared/DesktopHeader';
// import DesktopFooter from './components/shared/DesktopFooter';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* <DesktopHeader /> */}

        <main className="flex-grow">
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/register" element={<DesktopRegister />} />
            <Route path="/auth/signin" element={<DesktopSignin />} />
            <Route path="/auth/verify" element={<EmailVerificationPage />} />
            <Route path="/auth/welcome" element={<WelcomeMessage />} />

            {/* Other App Routes */}
            <Route path="/search/01" element={<SearchPage01 />} />
            <Route path="/checkout/cart" element={<CartPage />} />
            <Route path="/checkout/shipping" element={<ShippingPage />} />

            {/* Default route */}
            <Route
              path="/"
              element={<div className="text-center p-10">Home Page Placeholder</div>}
            />
          </Routes>
        </main>

        <footer />
        {/* <DesktopFooter /> */}
      </div>
    </Router>
  );
}

export default App;
