import { useState, type JSX, type ChangeEvent } from "react";
import { Input } from "../../components/ui/input.tsx";
import { Button } from "../../components/ui/button.tsx";
import DesktopHeader from "../../components/shared/DesktopHeader.tsx";
import DesktopFooter from "../../components/shared/DesktopFooter.tsx";
import { EyeIcon, EyeOffIcon } from "lucide-react";

// Social media login options configuration
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

// Interface for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const DesktopSignin = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (): void => {
    console.log("Registration attempt:", formData);
    alert("Registration functionality would be implemented here!");
  };

  const handleSocialLogin = (provider: string): void => {
    console.log(`${provider} login clicked`);
    alert(`${provider} login would be implemented here!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <DesktopHeader />

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start px-4 lg:px-[108px] py-4 lg:py-[70px]">
        <div className="flex flex-col lg:flex-row w-full max-w-none lg:max-w-[1440px] gap-6 lg:gap-0">
          {/* Left-side Image */}
          <div
            className="w-full lg:w-[600px] h-32 lg:h-[418px] bg-center bg-cover rounded-lg lg:rounded-none"
            style={{
              backgroundImage:
                "url(https://c.animaapp.com/mcuzt9hi6xboII/img/frame-26086866.png)",
            }}
          />

          {/* Form Section */}
          <div className="flex flex-col lg:ml-24 lg:mt-15 w-full lg:w-auto lg:flex-1 lg:min-w-[600px] mx-auto lg:mx-0 px-4 lg:px-8">
            {/* Form Title */}
            <h2 className="text-center text-3xl sm:text-3.5xl lg:text-4xl font-semibold text-[#0c0c0c] mb-6 lg:mb-8">
              Create Account
            </h2>

            {/* First Name Input */}
            <Input
              placeholder="First Name"
              className="mb-4 h-8 sm:h-10 lg:h-12 px-3 w-full text-base lg:text-xl !min-h-[48px] !text-xl"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              style={{ height: "48px", fontSize: "16px" }}
            />

            {/* Last Name Input */}
            <Input
              placeholder="Last Name"
              className="mb-4 h-8 sm:h-10 lg:h-12 px-3 w-full text-base lg:text-xl !min-h-[48px] !text-xl"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              style={{ height: "48px", fontSize: "16px" }}
            />

            {/* Email Input with Eye Icon */}
            <div className="relative mb-4">
              <Input
                placeholder="Email"
                className="pr-10 h-8 sm:h-10 lg:h-12 px-3 w-full text-base lg:text-xl !min-h-[48px] !text-xl"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{ height: "48px", fontSize: "16px" }}
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                    style={{ width: "20px", height: "20px" }}
                  />
                ) : (
                  <EyeOffIcon
                    className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500"
                    style={{ width: "20px", height: "20px" }}
                  />
                )}
              </button>
            </div>

            {/* Password Input */}
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="mb-4 h-8 sm:h-10 lg:h-12 px-3 w-full text-base lg:text-xl !min-h-[48px] !text-xl"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{ height: "48px", fontSize: "16px" }}
            />

            {/* Submit Button */}
            <Button
              className="w-full h-8 sm:h-10 lg:h-12 mt-4 bg-[#748c70] text-white text-base lg:text-xl hover:bg-[#6a7a66] !min-h-[48px] !text-xl"
              onClick={handleSubmit}
              style={{ height: "48px", fontSize: "16px" }}
            >
              Register Now
            </Button>

            {/* Login Link */}
            <div className="text-center mt-6 text-base lg:text-lg text-[#0c0c0c]">
              Already Have An Account?
              <Button
                variant="ghost"
                className="text-[#748c70] ml-2 h-auto p-0 text-base lg:text-lg hover:text-[#6a7a66]"
                onClick={() => alert("Navigate to login page")}
              >
                Log In
              </Button>
            </div>

            {/* Divider */}
            <div className="text-center mt-4 text-base lg:text-lg text-[#0c0c0c]">
              Or
            </div>

            {/* Social Media Login Options */}
            <div className="flex gap-4 lg:gap-6 justify-center mt-6">
              {socialMediaOptions.map((icon, index) => (
                <button
                  key={index}
                  onClick={() => handleSocialLogin(icon.alt)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    alt={icon.alt}
                    src={icon.src}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12"
                  />
                </button>
              ))}
            </div>

            {/* Terms and Privacy Policy */}
            <p className="text-center text-sm lg:text-base text-[#0c0c0c] mt-6 leading-relaxed">
              By clicking "Register Now", you agree to our
              <span className="text-[#748c70] underline mx-1 cursor-pointer hover:text-[#6a7a66]">
                Terms & Conditions
              </span>
              and
              <span className="text-[#748c70] underline ml-1 cursor-pointer hover:text-[#6a7a66]">
                Privacy Policy
              </span>
              .
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <DesktopFooter />
    </div>
  );
};

export default DesktopSignin;
