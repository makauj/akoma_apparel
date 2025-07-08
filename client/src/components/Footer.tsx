export default function Footer() {
  return (
    <footer className="w-full bg-[#404040] text-white py-12 px-6">
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between gap-12">
        {/* Newsletter Section */}
        <div className="lg:w-[496px]">
          <h2 className="text-xl font-semibold mb-6">
            Join Our Club, Get 15% Off For Your Birthday
          </h2>

          <div className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="flex items-center border border-[#d1d9cf] px-4 py-2">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="flex-1 bg-transparent text-white placeholder-gray-300 border-none outline-none"
              />
              <img
                src="https://c.animaapp.com/mcuzt9hi6xboII/img/arrow-forward.svg"
                alt="Submit"
                className="w-4 h-4 cursor-pointer"
              />
            </div>

            {/* Checkbox */}
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="w-4 h-4 mt-1" />
              <span>
                By submitting your email, you agree to receive advertising emails from Modimal.
              </span>
            </label>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-10">
            {["2", "", "1", "3"].map((id, index) => (
              <img
                key={index}
                src={`https://c.animaapp.com/mcuzt9hi6xboII/img/social-media--${id}.svg`}
                alt="Social Icon"
                className="w-6 h-6"
              />
            ))}
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 mt-8 text-sm text-gray-400">
            <img
              src="https://c.animaapp.com/mcuzt9hi6xboII/img/copyright.svg"
              alt="Copyright"
              className="w-5 h-5"
            />
            <span>2023 Modimal. All Rights Reserved.</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            {
              title: "About Modimal",
              links: [
                "Collection",
                "Sustainability",
                "Privacy Policy",
                "Support System",
                "Terms & Condition",
                "Copyright Notice",
              ],
            },
            {
              title: "Help & Support",
              links: ["Orders & Shipping", "Returns & Refunds", "Faqs", "Contact Us"],
            },
            {
              title: "Join Up",
              links: ["Modimal Club", "Careers", "Visit Us"],
            },
          ].map((section, i) => (
            <div key={i}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2 text-sm">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <a href="#" className="hover:underline">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Chat Button */}
        <div className="self-end hidden lg:block">
          <button className="w-14 h-12 bg-[#717D6D] border border-white flex items-center justify-center">
            <img
              src="https://c.animaapp.com/mcuzt9hi6xboII/img/3p.svg"
              alt="Chat"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </footer>
  );
}
