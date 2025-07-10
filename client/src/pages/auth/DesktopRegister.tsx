import { useState, type JSX, type ChangeEvent } from "react";
import { Input } from "../../components/ui/input.tsx";
import { Button } from "../../components/ui/button.tsx";
import DesktopHeader from "../../components/shared/DesktopHeader.tsx";
import DesktopFooter from "../../components/shared/DesktopFooter.tsx";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

const DesktopRegister = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (): void => {
    console.log("Registration attempt:", formData);

    // Simulate successful registration
    setTimeout(() => {
      alert("Registered successfully!");
      navigate("/auth/welcome");
    }, 500);
  };

  const handleSocialLogin = (provider: string): void => {
    console.log(`${provider} login clicked`);
    alert(`${provider} login would be implemented here!`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <DesktopHeader />

      <main className="flex-grow flex justify-center items-start px-4 lg:px-[108px] py-8 lg:py-[142px]">
        <div className="flex flex-col lg:flex-row w-full max-w-none lg:max-w-[1440px] gap-8 lg:gap-0">
          <div
            className="w-full lg:w-[600px] h-64 lg:h-[837px] bg-center bg-cover rounded-lg lg:rounded-none"
            style={{
              backgroundImage:
                "url(https://c.animaapp.com/mcuzt9hi6xboII/img/frame-26086866.png)",
            }}
          />

          <div className="flex flex-col lg:ml-48 lg:mt-30 w-full lg:w-auto lg:flex-1 lg:min-w-[600px] mx-auto lg:mx-0 px-4 lg:px-8">
            <h2 className="text-center text-6xl sm:text-7xl lg:text-8xl font-semibold text-[#0c0c0c] mb-12 lg:mb-16">
              Create Account
            </h2>

            <Input
              placeholder="First Name"
              className="mb-8 h-16 sm:h-20 lg:h-24 px-6 w-full text-xl lg:text-2xl !min-h-[96px] !text-2xl"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              style={{ height: "96px", fontSize: "24px" }}
            />

            <Input
              placeholder="Last Name"
              className="mb-8 h-16 sm:h-20 lg:h-24 px-6 w-full text-xl lg:text-2xl !min-h-[96px] !text-2xl"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              style={{ height: "96px", fontSize: "24px" }}
            />

            <div className="relative mb-8">
              <Input
                placeholder="Email"
                className="pr-16 h-16 sm:h-20 lg:h-24 px-6 w-full text-xl lg:text-2xl !min-h-[96px] !text-2xl"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                style={{ height: "96px", fontSize: "24px" }}
              />
              <button
                type="button"
                className="absolute top-1/2 right-4 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon
                    className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500"
                    style={{ width: "32px", height: "32px" }}
                  />
                ) : (
                  <EyeOffIcon
                    className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500"
                    style={{ width: "32px", height: "32px" }}
                  />
                )}
              </button>
            </div>

            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="mb-8 h-16 sm:h-20 lg:h-24 px-6 w-full text-xl lg:text-2xl !min-h-[96px] !text-2xl"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              style={{ height: "96px", fontSize: "24px" }}
            />

            <Button
              className="w-full h-16 sm:h-20 lg:h-24 mt-8 bg-[#748c70] text-white text-xl lg:text-2xl hover:bg-[#6a7a66] !min-h-[96px] !text-2xl"
              onClick={handleSubmit}
              style={{ height: "96px", fontSize: "24px" }}
            >
              Register Now
            </Button>

            <div className="text-center mt-12 text-lg lg:text-xl text-[#0c0c0c]">
              Already Have An Account?
              <Button
                variant="ghost"
                className="text-[#748c70] ml-2 h-auto p-0 text-lg lg:text-xl hover:text-[#6a7a66]"
                onClick={() => alert("Navigate to login page")}
              >
                Log In
              </Button>
            </div>

            <div className="text-center mt-8 text-lg lg:text-xl text-[#0c0c0c]">
              Or
            </div>

            <div className="flex gap-8 lg:gap-12 justify-center mt-12">
              {socialMediaOptions.map((icon, index) => (
                <button
                  key={index}
                  onClick={() => handleSocialLogin(icon.alt)}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    alt={icon.alt}
                    src={icon.src}
                    className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"
                  />
                </button>
              ))}
            </div>

            <p className="text-center text-base lg:text-lg text-[#0c0c0c] mt-12 leading-relaxed">
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

      <DesktopFooter />
    </div>
  );
};

export default DesktopRegister;
