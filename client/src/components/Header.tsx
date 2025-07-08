import { Search, User, Heart, ShoppingBag, X } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full">
      {/* Top Green Banner */}
      <div className="w-full bg-[#5A6D57] h-5 flex items-center justify-center text-white text-[12px] font-semibold tracking-wider uppercase leading-[leading-16px]">
        Enjoy Free Shipping On All Orders
      </div>

      {/* Main Header Bar */}
      <div className="w-full bg-white flex items-center justify-between px-8 py-4">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <span className="font-bold text-lg tracking-wide text-gray-800">modimal<span className="text-sm">.</span></span>
          <span className="text-[10px] text-[#404040] tracking-[0.1em]">women clothing</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-8 text-sm text-[#404040]">
          <a href="#" className="hover:underline">Collection</a>
          <a href="#" className="hover:underline">New In</a>
          <a href="#" className="hover:underline">Modiweek</a>
          <a href="#" className="hover:underline">Plus Size</a>
          <a href="#" className="hover:underline">Sustainability</a>
        </nav>

        {/* Icons */}
        <div className="flex gap-6 items-center">
          <X className="w-5 h-5 text-gray-700 cursor-pointer" />
          <User className="w-5 h-5 text-gray-700 cursor-pointer" />
          <Heart className="w-5 h-5 text-gray-700 cursor-pointer" />
          <ShoppingBag className="w-5 h-5 text-gray-700 cursor-pointer" />
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-center bg-white py-6 border-b">
        <div className="w-[85%] max-w-[1224px] relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-12 pr-4 py-3 border-b border-gray-300 text-gray-700 placeholder-gray-400 text-base focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
}
