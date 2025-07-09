import Input from '../../components/layout/input';
import {
  HeartIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';
import logo from '../../assets/logo/akoma-logo.jpg';

// import bgImage from '../../../assets/search/image-28.png';
// import headerBg from '../../../assets/search/rectangle-12406.png';

const navItems = ['Collection', 'New In', 'Modiweek', 'Plus Size', 'Sustainability'];

const SearchPage01 = (): JSX.Element => {
  return (
    <div className="flex justify-center bg-white w-full min-h-screen">
      <div className="relative w-[1440px] h-[1024px] overflow-hidden">
        {/* Background Images */}
        {/* <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full" />
        <img src={headerBg} alt="Header BG Overlay" className="absolute inset-0 w-full h-full" /> */}

        {/* Top Bar with Free Shipping */}
        <div className="absolute top-0 left-0 w-full h-[30px] bg-[#5A6D57] flex items-center justify-center text-white text-sm font-medium tracking-wide">
          Enjoy Free Shipping On All Orders
        </div>

        {/* Header Section */}
        <header className="absolute top-[30px] left-0 w-full flex items-center justify-between px-[108px] h-[80px] bg-white z-10">
          {/* Logo */}
          <div className="flex flex-col items-center justify-center gap-1 w-[184px] h-auto">
            <div className="flex items-center justify-center">
              <img
                src={logo}
                alt="Akoma Apparel Logo"
                className="w-full h-auto object-contain"
              />
            </div>
            <span className="text-[10px] text-[#404040] tracking-[1px]">
              Akoma Apparel
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex gap-6">
            {navItems.map((text, index) => (
              <span key={index} className="text-base text-neutral-700 font-medium">
                {text}
              </span>
            ))}
          </nav>

          {/* Header Icons */}
          <div className="flex items-center gap-[24px]">
            <XIcon className="w-6 h-6 text-[#404040]" />
            <UserIcon className="w-6 h-6 text-[#404040]" />
            <HeartIcon className="w-6 h-6 text-[#404040]" />
            <ShoppingBagIcon className="w-6 h-6 text-[#404040]" />
          </div>
        </header>

        {/* Search Bar Section */}
        <div className="absolute top-[110px] left-0 w-full bg-white py-4 px-[108px]">
          <div className="relative w-full max-w-[1224px] border-b border-gray-300">
            <SearchIcon className="absolute top-3 left-3 text-gray-400" />
            <Input
              className="pl-12 w-full h-14 text-lg text-gray-500 border-none focus:ring-0 focus:ring-offset-0"
              placeholder="Search"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage01;
