import React, { useState } from 'react';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';

// Footer Component
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="w-full bg-[#404040] text-white py-12 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row justify-between gap-12 relative">
          {/* Newsletter Section */}
          <div className="lg:w-[496px]">
            <h2 className="text-xl font-semibold mb-6">
              Join Our Club, Get 15% Off For Your Birthday
            </h2>

            <div className="flex flex-col gap-4">
              {/* Email Input */}
              <div className="flex items-center border border-[#d1d9cf] px-4 py-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Your Email Address"
                  className="flex-1 bg-transparent text-white placeholder-gray-300 border-none outline-none"
                />
                <button
                  onClick={handleSubmit}
                  className="text-[#d1d9cf] hover:text-white cursor-pointer"
                >
                  →
                </button>
              </div>

              {/* Checkbox */}
              <label className="flex items-start gap-2 text-sm">
                <input type="checkbox" className="w-4 h-4 mt-1" />
                <span>
                  By submitting your email, you agree to receive advertising emails from Akoma Apparel.
                </span>
              </label>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 mt-10">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <MessageCircle size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="flex items-center gap-2 mt-8 text-sm text-gray-400">
              <span>©</span>
              <span>2023 Akoma Apparel. All Rights Reserved</span>
            </div>
          </div>

          {/* Footer Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            <div>
              <h3 className="text-lg font-semibold mb-4">About Akoma Apparel</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Collection</a></li>
                <li><a href="#" className="hover:underline">Sustainability</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Support System</a></li>
                <li><a href="#" className="hover:underline">Terms & Condition</a></li>
                <li><a href="#" className="hover:underline">Copyright Notice</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Orders & Shipping</a></li>
                <li><a href="#" className="hover:underline">Returns & Refunds</a></li>
                <li><a href="#" className="hover:underline">FAQs</a></li>
                <li><a href="#" className="hover:underline">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Join Up</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:underline">Akoma Apparel Club</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Visit Us</a></li>
              </ul>
            </div>
          </div>

          {/* Chat Button */}
          <div className="absolute bottom-0 right-0 hidden lg:block">
            <button className="w-14 h-12 bg-[#717D6D] border border-white flex items-center justify-center hover:bg-[#5a6657] transition-colors">
              <MessageCircle size={24} className="text-white" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main content area - you can add your page content here */}
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Welcome to Akoma Apparel</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your main page content goes here. This is just placeholder content to show how the footer integrates with the rest of your application.
          </p>
          
          {/* Add more content to make the page scrollable */}
          <div className="space-y-8">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-semibold mb-4">Section {i + 1}</h2>
                <p className="text-gray-600">
                  This is placeholder content for section {i + 1}. In a real application, 
                  this would contain your actual page content, components, and functionality.
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;