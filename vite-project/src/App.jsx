// src/App.jsx
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Pages & Components
import LandingPage from './pages/LandingPage';
import AdminDashboard from './pages/AdminPage';
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // On initial load, set auth state if token exists
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Toggle body text color based on dark mode
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
      <Background darkMode={darkMode} />

      <div style={{ position: 'relative', zIndex: 10 }}>
        <NavBar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        <main style={{ minHeight: 'calc(100vh - 120px)' }}>
          <Routes>
            <Route path="/" element={<LandingPage darkMode={darkMode} />} />
            <Route
              path="/login"
              element={
                <Login
                  darkMode={darkMode}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="/register"
              element={
                <Register
                  darkMode={darkMode}
                  setIsAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route
              path="/calculator"
              element={<Calculator darkMode={darkMode} />}
            />
            <Route path="/ad" element={<AdPage darkMode={darkMode} />} />
            <Route
              path="/testimonials"
              element={<Testimonials darkMode={darkMode} />}
            />
            <Route
              path="/admin"
              element={<AdminDashboard />}
            />
            {/* Catch-all 404 */}
            <Route
              path="*"
              element={
                <h2 className="text-center my-5">404 - Page Not Found</h2>
              }
            />
          </Routes>
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </Router>
  );
}
