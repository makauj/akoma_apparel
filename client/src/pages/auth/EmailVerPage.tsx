import { useState, type JSX } from "react";
import { X } from "lucide-react";
import DesktopHeader from "../../components/shared/DesktopHeader";
import DesktopFooter from "../../components/shared/DesktopFooter";

const EmailVerificationPage = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <DesktopHeader />
        <main className="flex-grow flex justify-center items-center">
          <p className="text-gray-600">Modal closed</p>
        </main>
        <DesktopFooter />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white relative">
      <DesktopHeader />

      {/* Blurred background */}
      <div className="absolute inset-0 z-10">
        <div className="w-full h-full bg-white/50 backdrop-blur-sm"></div>
      </div>

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

          {/* Form Section */}
          <div className="flex flex-col ml-[128px] mt-[120px] max-w-[392px] w-full">
            <h2 className="text-center text-3xl font-semibold text-[#0c0c0c] mb-6">
              Create Account
            </h2>

            <div className="mb-2 h-10 px-4 border border-gray-300 rounded-md bg-gray-100"></div>
            <div className="mb-2 h-10 px-4 border border-gray-300 rounded-md bg-gray-100"></div>
            <div className="mb-2 h-10 px-4 border border-gray-300 rounded-md bg-gray-100"></div>
            <div className="mb-2 h-10 px-4 border border-gray-300 rounded-md bg-gray-100"></div>

            <div className="w-full h-10 mt-2 bg-gray-400 rounded-md"></div>
          </div>
        </div>
      </main>

      {/* Modal Rectangle */}
      <div className="fixed inset-0 z-20 flex items-center justify-center">
        <div className="relative w-[854px] h-[446px] bg-white rounded-lg shadow-2xl border border-gray-200">
          {/* Close button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-4 left-4 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Content */}
          <div className="flex flex-col items-center justify-center h-full px-12 text-center">
            <h2 className="text-2xl font-semibold text-[#0c0c0c] mb-8">
              Verify Your Email Address
            </h2>

            <p className="text-base text-[#0c0c0c] mb-4 leading-relaxed max-w-md">
              We've sent an email to{" "}
              <span className="font-medium">nina@gmail.com</span> to verify your
              email address and activate your account.
            </p>

            <p className="text-base text-[#0c0c0c] mb-6 leading-relaxed max-w-md">
              The link in the email will expire in 24 hours.
            </p>

            <button className="text-[#748c70] underline hover:text-[#5f7361] transition-colors">
              Click here if you did not receive an email or would like to change
              the email address you registered with.
            </button>
          </div>
        </div>
      </div>

      <DesktopFooter />
    </div>
  );
};

export default EmailVerificationPage;
  