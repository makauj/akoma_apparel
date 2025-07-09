import { HeartIcon, SearchIcon, ShoppingBagIcon, UserIcon } from "lucide-react";
import logo from "../../assets/logo/akoma-logo.jpg";
import { Card, CardContent } from "../../components/ui/card";

const navItems = [
  "Collection",
  "New In",
  "Modiweek",
  "Plus Size",
  "Sustainability",
];

const categories = [
  "Shop All",
  "Top & Blouses",
  "Tees",
  "Pants",
  "Jackets & Outwears",
  "Pullovers",
  "Dresses & Jumpsuits",
  "Shorts & Skirts",
];

const featuredCategories = [
  {
    name: "Pants",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-1.svg",
  },
  {
    name: "Dresses",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-2.svg",
  },
  {
    name: "Blouses",
    image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383.svg",
  },
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
            <span
              key={idx}
              className="text-[#404040] text-sm tracking-wide hover:text-black w-[104px] h-[32px] flex items-center justify-center"
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center justify-center gap-[24px] h-8">
          <SearchIcon className="w-6 h-6 text-[#404040]" />
          <UserIcon className="w-6 h-6 text-[#404040]" />
          <HeartIcon className="w-6 h-6 text-[#404040]" />
          <ShoppingBagIcon className="w-6 h-6 text-[#404040]" />
        </div>
      </div>
    </header>
  );
};

const SearchPage01 = () => {
  return (
    <div className="bg-[#ffffff] flex flex-col items-center w-full min-h-screen">
      <Header />

      <div className="bg-white w-[1440px] h-[1024px] relative">
        {/* Background Images */}
        <img
          className="absolute w-full h-full top-0 left-0 object-cover"
          alt="Background"
          src="https://c.animaapp.com/mcuwrrdgAi4Qcu/img/image-28.png"
        />
        <img
          className="absolute w-full h-full top-0 left-0 object-cover"
          alt="Overlay"
          src="https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12406.svg"
        />

        {/* Blurred Foreground Container */}
        <div className="absolute w-full h-[660px] top-0 left-0 bg-white/60 backdrop-blur-[6.5px]">
          {/* Category Sidebar */}
          <div className="absolute top-[142px] left-[108px] flex flex-col gap-6">
            <h3 className="text-lg font-semibold text-[#0c0c0c]">Category</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat, index) => (
                <span
                  key={index}
                  className="text-sm text-[#404040] hover:text-black cursor-pointer"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Featured Category Cards */}
          <div className="absolute top-[142px] left-[660px] flex gap-6">
            {featuredCategories.map((item, index) => (
              <Card key={index} className="border-none shadow-none">
                <CardContent className="p-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-52 h-[420px] object-cover"
                  />
                  <p className="mt-3 text-center text-sm font-medium text-black">
                    {item.name}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage01;
export { Header };
