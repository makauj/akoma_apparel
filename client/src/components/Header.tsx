import {
  SearchIcon,
  UserIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "lucide-react";

export default function Header() {
  const navItems = [
    "Collection",
    "New In",
    "Modiweek",
    "Plus Size",
    "Sustainability",
  ];

  return (
    <header className="w-full bg-white">
      {/* Top Banner */}
      <div className="w-full h-[30px] bg-[#5A6D57] flex items-center justify-center">
        <p className="text-white text-xs font-medium tracking-wide uppercase">
          Enjoy Free Shipping On All Orders
        </p>
      </div>

      {/* Main Header Section */}
      <div className="flex items-center justify-between h-[80px] px-[108px] max-w-[1440px] mx-auto">
        {/* Logo */}
        <div className="flex flex-col items-center justify-center gap-1 w-[184px] h-[46px]">
          <div className="flex items-end justify-center gap-1">
            <span className="text-[32px] font-bold text-[#404040] tracking-[3.2px] leading-none">
              modimal
            </span>
            <img
              className="w-2.5 h-2.5"
              alt="™"
              src="https://c.animaapp.com/mcuzt9hi6xboII/img/subtract.svg"
            />
          </div>
          <span className="text-[10px] text-[#404040] tracking-[1px]">
            women clothing
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="flex gap-6 items-center">
          {navItems.map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="text-[#404040] text-sm tracking-wide hover:text-black"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center justify-center gap-6 h-8">
          <button className="w-6 h-6 flex items-center justify-center">
            <SearchIcon className="w-6 h-6 text-[#404040]" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center bg-[#cbcbcb]">
            <UserIcon className="w-6 h-6 text-[#404040]" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center">
            <HeartIcon className="w-6 h-6 text-[#404040]" />
          </button>
          <button className="w-6 h-6 flex items-center justify-center">
            <ShoppingBagIcon className="w-6 h-6 text-[#404040]" />
          </button>
        </div>
      </div>
    </header>
  );
}
