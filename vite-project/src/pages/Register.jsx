// src/pages/Register.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ darkMode }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const result = await response.json();
      console.log("Register response:", result);
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className={`card p-4 ${darkMode ? 'bg-secondary text-white' : ''}`} style={{ width: '400px' }}>
        <h2 className={`text-center mb-4 ${darkMode ? 'text-white' : ''}`}>Register</h2>
        
        <form onSubmit={handleRegister}>
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
              Email
            </label>
            <input
              type="email"
              name="email"
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              value={formData.email}
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

          <div className="mb-4">
            <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              value={formData.confirmPassword}
              required
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" 
            className={`btn w-100 ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
          >
            Register
          </button>
        </form>

        <p className={`mt-3 text-center ${darkMode ? 'text-white-50' : 'text-muted'}`}>
          Already have an account?{' '}
          <Link 
            to="/login" 
            className={darkMode ? 'text-info' : 'text-primary'}
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}