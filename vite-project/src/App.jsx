// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Calculator from './pages/Calculator';
import AdPage from './pages/AdPage';
import Testimonials from './pages/Testimonials';

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
        <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} border-bottom mb-4`}>
          <div className="container-fluid">
            <div className="navbar-nav flex-row">
              <div className="d-flex flex-wrap">
                <NavLink 
                  to="/" 
                  className={({ isActive }) => 
                    `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => 
                    `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                  }
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => 
                    `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                  }
                >
                  Register
                </NavLink>
                <NavLink 
                  to="/calculator" 
                  className={({ isActive }) => 
                    `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                  }
                >
                  Calculator
                </NavLink>
                <NavLink 
                  to="/ad" 
                  className={({ isActive }) => 
                    `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                  }
                >
                  Ad Page
                </NavLink>
              </div>
            </div>
            
            <button 
              className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage darkMode={darkMode} />} />
          <Route path="/login" element={<Login darkMode={darkMode} />} />
          <Route path="/register" element={<Register darkMode={darkMode} />} />
          <Route path="/calculator" element={<Calculator darkMode={darkMode} />} />
          <Route path="/ad" element={<AdPage darkMode={darkMode} />} />
          <Route path="/testimonials" element={<Testimonials darkMode={darkMode} />} />
          <Route path="*" element={<h2 className="text-center my-5">404 - Page Not Found</h2>} />
        </Routes>

        <footer className={`mt-5 py-3 ${darkMode ? 'bg-dark' : 'bg-light'} border-top`}>
          <p className="text-center mb-0">
            &copy; 2025 Titanic Survival Prediction App | Made with 💙 by 7 Up
          </p>
        </footer>
      </Router>
    </div>
  );
}