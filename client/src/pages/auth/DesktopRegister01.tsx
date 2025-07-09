import { useState, type JSX } from "react";
import { Input } from "../../components/ui/input.tsx";
import {Button} from "../../components/ui/button.tsx";
import DesktopHeader from "../../components/shared/DesktopHeader.tsx";
import DesktopFooter  from "../../components/shared/DesktopFooter.tsx";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const socialMediaOptions = [
  {
    alt: "Google",
    src: "https://c.animaapp.com/mcuzt9hi6xboII/img/socialmedia-sign-up-icons.svg",
  },
  {
    alt: "Facebook",
    src: "https://c.animaapp.com/mcuzt9hi6xboII/img/socialmedia-sign-up-icons-2.svg",
  },
  {
    alt: "Apple",
    src: "https://c.animaapp.com/mcuzt9hi6xboII/img/socialmedia-sign-up-icons-1.svg",
  },
];

const DesktopRegister = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DesktopHeader />

      <main className="flex-grow flex justify-center items-start px-[108px] py-[142px]">
        <div className="flex w-full max-w-[1440px]">
          {/* Left-side Image */}
          <div
            className="w-[600px] h-[837px] bg-center bg-cover"
            style={{
              backgroundImage:
                "url(https://c.animaapp.com/mcuzt9hi6xboII/img/frame-26086866.png)",
            }}
          />

          {/* Form Section */}
          <div className="flex flex-col ml-[128px] mt-[120px] max-w-[392px] w-full">
            <h2 className="text-center text-3xl font-semibold text-[#0c0c0c] mb-6">
              Create Account
            </h2>

            <Input placeholder="First Name" className="mb-2 h-10 px-4" />
            <Input placeholder="Last Name" className="mb-2 h-10 px-4" />
            <Input placeholder="Email" className="mb-2 h-10 px-4" />

            <div className="relative mb-2">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="pr-10 h-10 px-4"
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="w-4 h-4 text-gray-500" />
                ) : (
                  <EyeOffIcon className="w-4 h-4 text-gray-500" />
                )}
              </button>
            </div>

            <Button className="w-full h-10 mt-2 bg-[#748c70] text-white">
              Register Now
            </Button>

            <div className="text-center mt-4 text-sm text-[#0c0c0c]">
              Already have an account?
              <Button variant="ghost" className="text-[#748c70] ml-1 h-10">
                Log In
              </Button>
            </div>

            <div className="text-center mt-2 text-sm text-[#0c0c0c]">Or</div>

            <div className="flex gap-4 justify-center mt-4">
              {socialMediaOptions.map((icon, index) => (
                <img
                  key={index}
                  alt={icon.alt}
                  src={icon.src}
                  className="w-[35px] h-[35px]"
                />
              ))}
            </div>

            <p className="text-center text-xs text-[#0c0c0c] mt-4">
              By clicking "Register Now", you agree to our
              <span className="text-[#748c70] underline mx-1 cursor-pointer">
                Terms & Conditions
              </span>
              and
              <span className="text-[#748c70] underline ml-1 cursor-pointer">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </main>

      <DesktopFooter />
    </div>
  );
};

export default DesktopRegister;
