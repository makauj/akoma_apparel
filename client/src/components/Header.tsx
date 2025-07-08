import { Search, User, Heart, ShoppingBag, X } from 'lucide-react';

export default function Header() {
  return (
    <header className="w-full bg-white">
      {/* Top Green Banner */}
      <div className="w-full bg-[#5A6D57] h-[30px] flex items-center justify-center">
        <span className="text-white text-xs font-medium tracking-wider uppercase">
          Enjoy Free Shipping On All Orders
        </span>
      </div>

      {/* Header Main Content */}
      <div className="w-full flex justify-center bg-white">
        <div className="w-full max-w-[1440px] px-[100px] h-[80px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex flex-col">
            <div className="font-bold text-xl text-gray-800 tracking-wide">
              modimal<span className="text-lg">.</span>
            </div>
            <div className="text-xs text-gray-500 uppercase tracking-wider">
              women clothing
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex items-center space-x-12">
            <a href="#" className="text-gray-700 text-sm hover:text-gray-900 transition-colors">
              Collection
            </a>
            <a href="#" className="text-gray-700 text-sm hover:text-gray-900 transition-colors">
              New In
            </a>
            <a href="#" className="text-gray-700 text-sm hover:text-gray-900 transition-colors">
              Modiweek
            </a>
            <a href="#" className="text-gray-700 text-sm hover:text-gray-900 transition-colors">
              Plus Size
            </a>
            <a href="#" className="text-gray-700 text-sm hover:text-gray-900 transition-colors">
              Sustainability
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-20">
            <X className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors" />
            <User className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors" />
            <Heart className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors" />
            <ShoppingBag className="w-6 h-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors" />
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="w-full flex justify-center bg-gray-50 py-4 border-t border-gray-200">
        <div className="w-full max-w-[1440px] px-[100px] flex justify-center">
          <div className="w-full max-w-[1040px] h-[56px] flex items-center border-b border-gray-300 px-4 relative">
            {/* Search Icon */}
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />

            {/* Input Field */}
            <input
              type="text"
              placeholder="Pants"
              className="w-full h-full pl-12 pr-12 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none"
            />

            {/* Clear Icon */}
            <X className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer" />
          </div>
        </div>
      </div>
    </header>
  );
}
