const Footer = () => {
  return (
    <footer className="bg-[#404040] text-white px-6 py-12 w-full">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h4 className="text-lg font-semibold mb-4 tracking-wide">Akoma Apparel</h4>
          <p className="text-sm text-gray-300">
            Bold styles, timeless identity. Discover what moves you.
          </p>
        </div>
        <div>
          <h5 className="font-medium mb-2">Customer Care</h5>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>Contact Us</li>
            <li>Shipping</li>
            <li>Instagram</li>
            <li>Facebook</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>
      <div className="text-center mt-12 text-sm text-gray-400">
        &copy; {new Date().getFullYear()} Akoma Apparel. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
