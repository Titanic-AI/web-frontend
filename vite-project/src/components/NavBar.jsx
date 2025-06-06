// src/components/NavBar.jsx
import { NavLink, useNavigate } from 'react-router-dom';
import lightLogo from '../assets/logo-256.png';
import darkLogo from '../assets/logo-256-B.png';

export default function NavBar({ darkMode, setDarkMode, isAuthenticated, setIsAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'} border-bottom mb-4`}>
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img 
            src={darkMode ? lightLogo : darkLogo} 
            alt="Titanic App Logo" 
            width="40" 
            height="40" 
            className="me-2"
          />
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
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarContent">
          <div className="navbar-nav me-auto mb-2 mb-lg-0">
            <NavLink 
              to="/" 
              className={({ isActive }) => `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`}
            >
              Home
            </NavLink>
            <NavLink 
              to="/calculator" 
              className={({ isActive }) => `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`}
            >
              Calculator
            </NavLink>
            <NavLink 
              to="/ad" 
              className={({ isActive }) => `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`}
            >
              Ad Page
            </NavLink>
          </div>

          <div className="d-flex align-items-center gap-2">
            {/* Auth Links */}
            {isAuthenticated ? (
              <button className="btn btn-sm btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <NavLink 
                  to="/login" 
                  className={({ isActive }) => `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`}
                >
                  Login
                </NavLink>
                <NavLink 
                  to="/register" 
                  className={({ isActive }) => `nav-link mx-2 ${isActive ? 'active fw-bold' : ''}`}
                >
                  Register
                </NavLink>
              </>
            )}

            {/* Dark mode toggle */}
            <button 
              className={`btn btn-sm ${darkMode ? 'btn-outline-light' : 'btn-outline-dark'}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
  