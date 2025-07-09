import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/headers/SearchHeader';
import SearchPage01 from './pages/search/SearchPage01';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />

        <main className="flex-grow">
          <Routes>
            <Route path="/search/01" element={<SearchPage01 />} />
            <Route path="/" element={<div className="text-center p-10">Home Page Placeholder</div>} />
          </Routes>
        </main>

        <footer />
      </div>
    </Router>
  );
}

export default App;
