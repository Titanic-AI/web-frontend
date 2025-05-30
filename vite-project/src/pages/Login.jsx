// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ darkMode }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      const result = await response.json();
      console.log("Login response:", result);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className={`card p-4 ${darkMode ? 'bg-secondary text-white' : ''}`} style={{ width: '400px' }}>
        <h2 className={`text-center mb-4 ${darkMode ? 'text-white' : ''}`}>Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              value={formData.username}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              value={formData.password}
              required
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className={`btn w-100 ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
          >
            Login
          </button>
        </form>

        <p className={`mt-3 text-center ${darkMode ? 'text-white-50' : 'text-muted'}`}>
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className={darkMode ? 'text-info' : 'text-primary'}
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}