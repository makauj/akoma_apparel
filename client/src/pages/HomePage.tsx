import logo from "../assets/logo/akoma-logo.jpg";
import DesktopHeader from "../components/shared/DesktopHeader.tsx";
// import { Card, CardContent } from "../components/ui/card";

const navItems = [
  "Home",
  "Categories",
  "Search",
  "Women",
  "Men",
  "Kids",
];

// const categories = [
//   "Shop All",
//   "Top & Blouses",
//   "Tees",
//   "Pants",
//   "Jackets & Outwears",
//   "Pullovers",
//   "Dresses & Jumpsuits",
//   "Shorts & Skirts",
// ];

// const featuredCategories = [
//   {
//     name: "Pants",
//     image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-1.svg",
//   },
//   {
//     name: "Dresses",
//     image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383-2.svg",
//   },
//   {
//     name: "Blouses",
//     image: "https://c.animaapp.com/mcuwrrdgAi4Qcu/img/rectangle-12383.svg",
//   },
// ];


const HomePage = () => {
  return (
    <div className="bg-[#ffffff] flex flex-col items-center w-full min-h-screen">
      <DesktopHeader />

      <div className="bg-white w-[1440px] h-[600px] relative">
        {/* Background Images */}
        <img
          className="absolute w-full h-full top-0 left-0 object-cover"
          alt="Background"
          src="https://d2ysdoq3nznp4y.cloudfront.net/assets/home_background.png"
        />
        {/* Blurred Foreground Container */}
        <div className="absolute w-full h-[60px] top-0 left-0 bg-white/60">
          {/* Category Sidebar */}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
