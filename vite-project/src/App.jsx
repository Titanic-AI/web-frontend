// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculator';
import AdPage from './pages/AdPage';
import Testimonials from './components/Testimonials';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Toggle body class dynamically
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('bg-dark', 'text-light');
      document.body.classList.remove('bg-light', 'text-dark');
    } else {
      document.body.classList.add('bg-light', 'text-dark');
      document.body.classList.remove('bg-dark', 'text-light');
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}>
      <Router>
        <NavBar darkMode={darkMode} setDarkMode={setDarkMode} />

        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/register" element={<Register darkMode={darkMode} />} />
          <Route path="/calculator" element={<Calculator darkMode={darkMode} />} />
          <Route path="/ad" element={<AdPage darkMode={darkMode} />} />
          <Route path="/testimonials" element={<Testimonials darkMode={darkMode} />} />
          <Route path="*" element={<h2 className="text-center my-5">404 - Page Not Found</h2>} />
        </Routes>

        <Footer darkMode={darkMode} />
      </Router>
    </div>
  );
}