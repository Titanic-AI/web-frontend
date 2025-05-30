// src/components/NavBar.jsx
import { NavLink } from 'react-router-dom';

export default function NavBar({ darkMode, setDarkMode }) {
  return (
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
  );
}