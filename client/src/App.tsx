import Header from "./components/Header"; // adjust path as needed
import Footer from "./components/Footer"; // adjust path as needed

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* Page Content Goes Here */}
      <main className="flex-grow">
        {/* Example placeholder: */}
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          <h1 className="text-2xl font-semibold text-[#404040]">Welcome to Modimal</h1>
          <p className="mt-4 text-gray-700">
            This is where your homepage or routes will render.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
