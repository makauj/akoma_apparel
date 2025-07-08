// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <nav className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Akoma Apparel</Link>
        <ul className="flex space-x-4">
          <li><Link to="/products" className="hover:text-gray-300">Products</Link></li>
          <li><Link to="/cart" className="hover:text-gray-300">Cart</Link></li>
          {/* Add more links for Login/Register, User Profile later */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;