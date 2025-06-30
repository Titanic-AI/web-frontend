// src/components/NavBar.jsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import lightLogo from '../assets/logo-256-B.png';
import darkLogo  from '../assets/logo-256.png';

export default function NavBar({
  darkMode,
  setDarkMode,
  isAuthenticated,
  setIsAuthenticated,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  // Decode token to check admin status
  let isAdmin = false;
  if (isAuthenticated) {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        isAdmin = decoded.sub === 'admin@titanic.com';
      } catch (err) {
        console.error('Invalid token', err);
      }
    }
  }

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
      } border-bottom mb-4`}
    >
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img
            src={darkMode ? darkLogo : lightLogo}
            alt="Titanic AI Logo"
            width="40"
            height="40"
            className="me-2"
          />
          Titanic AI
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                }
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/calculator"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                }
              >
                Calculator
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/ad"
                className={({ isActive }) =>
                  `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                }
              >
                Ad Page
              </NavLink>
            </li>

            {/* History (any logged-in user) */}
            {isAuthenticated && (
              <li className="nav-item">
                <NavLink
                  to="/history"
                  className={({ isActive }) =>
                    `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`
                  }
                >
                  History
                </NavLink>
              </li>
            )}

            {/* Admin dropdown (only for admin@titanic.com) */}
            {isAdmin && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mx-2"
                  href="#"
                  id="adminMenu"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Admin
                </a>
                <ul className="dropdown-menu" aria-labelledby="adminMenu">
                  <li>
                    <NavLink
                      to="/admin/models"
                      className="dropdown-item"
                    >
                      Models
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/admin/dashboard"
                      className="dropdown-item"
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-2">
            {isAuthenticated ? (
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
                </ul>
              </>
            )}
            
            <button
              className={`btn btn-sm ${
                darkMode ? 'btn-outline-light' : 'btn-outline-dark'
              }`}
              onClick={() => setDarkMode((dm) => !dm)}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
