import { useState, type JSX, type ChangeEvent } from "react";
import { Input } from "../../components/ui/input.tsx";
import { Button } from "../../components/ui/button.tsx";
import DesktopHeader from "../../components/shared/DesktopHeader.tsx";
import DesktopFooter from "../../components/shared/DesktopFooter.tsx";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const DesktopLogin = (): JSX.Element => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = () => {
    alert(`Logging in with email: ${formData.email}`);
  };

  const handleForgotPassword = () => {
    alert("Redirect to Forgot Password flow");
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-white">
      <DesktopHeader />

      <main className="flex-grow flex justify-center items-start px-[108px] py-[142px] relative z-0">
        <div className="flex w-full max-w-[1440px]">
          {/* Left-side Image */}
          <div
            className="w-[600px] h-[837px] bg-center bg-cover"
            style={{
              backgroundImage:
                "url(https://c.animaapp.com/mcuzt9hi6xboII/img/frame-26086866.png)",
            }}
          />

          {/* Login Form */}
          <div className="flex flex-col ml-[192px] mt-[100px] max-w-[600px] w-full">
            <h2 className="text-center text-5xl font-semibold text-[#0c0c0c] mb-14">
              Login
            </h2>

            <Input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="mb-8 h-20 px-6 text-xl"
            />

            <div className="relative mb-2">
              <Input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="pr-14 h-20 px-6 text-xl"
              />
              <button
                type="button"
                className="absolute top-1/2 right-5 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="w-6 h-6 text-gray-500" />
                ) : (
                  <EyeOffIcon className="w-6 h-6 text-gray-500" />
                )}
              </button>
            </div>

            <div
              className="mb-8 text-right text-sm text-[#748c70] cursor-pointer hover:text-[#6a7a66]"
              onClick={handleForgotPassword}
            >
              Forgot your password?
            </div>

            <Button
              className="w-full h-20 bg-[#748c70] text-white text-2xl"
              onClick={handleLogin}
            >
              Login
            </Button>
          </div>
        </div>
      </main>

      <DesktopFooter />
    </div>
  );
};

export default DesktopLogin;

