// src/App.jsx
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import './styles/App.css';

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
    document.body.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <>
      <button className="toggle-theme" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <Router>
        <nav className="navbar">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/login" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Login
          </NavLink>
          <NavLink to="/register" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Register
          </NavLink>
          <NavLink to="/calculator" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Calculator
          </NavLink>
          <NavLink to="/ad" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Ad Page
          </NavLink>
        </nav>

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/ad" element={<AdPage />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="*" element={<h2>404 - Page Not Found</h2>} />
        </Routes>

        <footer className="footer">
          <p>&copy; 2025 Titanic Survival Prediction App | Made with 💙 by 7 Up</p>
        </footer>
      </Router>
    </>
  );
}
