import { HeartIcon, SearchIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import logo from "../../assets/logo/akoma-logo.jpg";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Categories", path: "/categories" },
  { label: "Search", path: "/search/01" },
  { label: "Women", path: "/products/women" },
  { label: "Men", path: "/products/men" },
  { label: "Kids", path: "/products/kids" },
];


const Header = () => {
  return (
    <header className="w-full bg-white">
      {/* Top Banner */}
      <div className="w-full h-[30px] bg-[#5A6D57] flex items-center justify-center">
        <p className="text-white text-xs font-medium tracking-wide uppercase">
          Enjoy Free Shipping On All Orders
        </p>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between h-[80px] px-[108px] max-w-[1440px] mx-auto">
        {/* Logo and Tagline */}
        <div className="flex flex-col items-center justify-center gap-1 w-[184px] h-auto">
          <div className="flex items-center justify-center">
            <img
              src={logo}
              alt="Akoma Apparel Logo"
              className="w-[46px] h-[46px] object-contain"
            />
          </div>
          <span className="text-[10px] text-[#404040] tracking-[1px]">
            Akoma Apparel
          </span>
        </div>

        {/* Navigation Menu */}
      <nav className="flex gap-6 items-center">
        {navItems.map((item, idx) => (
          <Link
            to={item.path}
            key={idx}
            className="text-[#404040] text-sm tracking-wide hover:text-black w-[104px] h-[32px] flex items-center justify-center"
          >
            {item.label}
          </Link>
        ))}
      </nav>


        {/* Icons */}
        <div className="flex items-center justify-center gap-[24px] h-8">
          <Link to="/search/01">
            <SearchIcon className="w-6 h-6 text-[#404040]" />
          </Link>
          <Link to="/auth/register">
            <UserIcon className="w-6 h-6 text-[#404040]" />
          </Link>
          <Link to="/wishlist">
            <HeartIcon className="w-6 h-6 text-[#404040]" />
          </Link>
          <Link to="/cart">
            <ShoppingBagIcon className="w-6 h-6 text-[#404040]" />
          </Link>
        </div>

      </div>
    </header>
  );
};

export default Header;
