
import HeaderMenuSearch from "../../components/shared/HeaderMenuSearch";
import DesktopHeader from "../../components/shared/DesktopHeader.tsx";
import DesktopFooter  from "../../components/shared/DesktopFooter.tsx";


const SearchPage01 = () => {
  return (
    <div className="bg-[#ffffff] flex flex-col items-center w-full min-h-screen">
      <DesktopHeader />
      <div className="absolute sticky top-[30px] z-40 w-full bg-white">
        <HeaderMenuSearch />
      </div>

      <div className="bg-white w-[100%] h-[600px] relative">
        {/* Background Image */}
        <img
          className="absolute w-full h-full top-0 left-0 object-cover"
          alt="Background"
          src="https://d2ysdoq3nznp4y.cloudfront.net/assets/home_background.png"
        />

        {/* Blurred Foreground Container */}
        <div className="absolute w-full h-[660px] top-0 left-0 bg-white/60 backdrop-blur-[6.5px]">
        </div>
      </div>
      <DesktopFooter/>
    </div>
  );
};

export default SearchPage01;

