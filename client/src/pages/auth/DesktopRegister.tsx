import Button from "../../components/ui/button";
import AccountCreationSection from "./sections/AccountCreationSection";
import FooterSection from "./sections/FooterSection";
import SearchHeader from "../../layout/headers/SearchHeader";

const DesktopRegister = (): JSX.Element => {
  const socialMediaOptions = [
    { alt: "Google", src: "..." },
    { alt: "Facebook", src: "..." },
    { alt: "Apple", src: "..." },
  ];

  return (
    <div className="bg-white flex justify-center w-full">
      <div className="bg-white w-full max-w-[1440px] relative flex flex-col">
        <HeaderSection />

        <div className="flex flex-row">
          <div
            className="w-[600px] h-[837px] ml-[108px] mt-[142px] bg-cover bg-center"
            style={{
              backgroundImage: "url(https://c.animaapp.com/...png)",
            }}
          />

          <div className="flex flex-col ml-[128px] mt-[142px]">
            <h2 className="w-[392px] text-2xl font-semibold text-center text-gray-900 mt-[120px]">
              Create Account
            </h2>

            <AccountCreationSection />

            <Button className="w-[392px] h-10 mt-4 bg-green-700 text-white text-sm font-semibold">
              Register Now
            </Button>

            <div className="flex items-center justify-center mt-4">
              <span className="text-sm text-gray-900">Already have an account?</span>
              <Button variant="ghost" className="h-10 text-green-700 text-sm font-medium ml-2">
                Log In
              </Button>
            </div>

            <div className="flex items-center justify-center mt-4">
              <span className="text-xs text-gray-700">Or</span>
            </div>

            <div className="flex items-center justify-center gap-4 mt-4">
              {socialMediaOptions.map((option, index) => (
                <img
                  key={index}
                  className="w-[35px] h-[35px]"
                  alt={option.alt}
                  src={option.src}
                />
              ))}
            </div>

            <div className="w-[392px] mt-4 text-center text-xs text-gray-700">
              By clicking Register Now, you agree to our{" "}
              <span className="underline text-green-600 cursor-pointer">Terms & Conditions</span> and{" "}
              <span className="underline text-green-600 cursor-pointer">Privacy Policy</span>.
            </div>
          </div>
        </div>

        <FooterSection />
      </div>
    </div>
  );
};

export default DesktopRegister;
