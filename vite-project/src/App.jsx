// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Import components
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculator';
import AdPage from './pages/AdPage';
import Testimonials from './components/Testimonials';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Background from './components/Background';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
    if (darkMode) {
      document.body.classList.add('text-light');
      document.body.classList.remove('text-dark');
    } else {
      document.body.classList.add('text-dark');
      document.body.classList.remove('text-light');
    }
  }, [darkMode]);

  return (
    <Router>
      {/* Background covers the entire viewport */}
      <Background darkMode={darkMode} />
      
      {/* Content wrapper with higher z-index */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />
        
        <main style={{ minHeight: 'calc(100vh - 120px)' }}>
          <Routes>
            <Route path="/" element={<LandingPage darkMode={darkMode} />} />
            <Route path="/login" element={<Login darkMode={darkMode} />} />
            <Route path="/register" element={<Register darkMode={darkMode} />} />
            <Route path="/calculator" element={<Calculator darkMode={darkMode} />} />
            <Route path="/ad" element={<AdPage darkMode={darkMode} />} />
            <Route path="/testimonials" element={<Testimonials darkMode={darkMode} />} />
            <Route path="*" element={<h2 className="text-center my-5">404 - Page Not Found</h2>} />
          </Routes>
        </main>
        
        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}