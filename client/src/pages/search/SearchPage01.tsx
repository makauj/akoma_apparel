import type { JSX } from "react";
import DesktopHeader from "../../components/shared/DesktopHeader.tsx";
import HeaderMenuSearch from "../../components/shared/HeaderMenuSearch.tsx";

// Optional background image imports (uncomment if needed)
// import bgImage from "../../assets/search/image-28.png";
// import headerBg from "../../assets/search/rectangle-12406.png";

const SearchPage01 = (): JSX.Element => {
  return (
    <div className="flex justify-center bg-white w-full min-h-screen">
      <div className="relative w-[1440px] h-[1024px] overflow-hidden">
        {/* Background Images */}
        {/* <img src={bgImage} alt="Background" className="absolute inset-0 w-full h-full" />
        <img src={headerBg} alt="Header BG Overlay" className="absolute inset-0 w-full h-full" /> */}

        {/* Shared Header */}
        <DesktopHeader />

        {/* Shared Search Bar */}
        <HeaderMenuSearch />
      </div>
    </div>
  );
};

export default SearchPage01;
