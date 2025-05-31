// src/pages/Login.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

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
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? 'text-light' : 'text-dark'}`}>
      <motion.div
        className="rounded-4 shadow-lg p-4 p-md-5"
        style={{
          width: '100%',
          maxWidth: '450px',
          backdropFilter: 'blur(12px)',
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Login
        </motion.h2>
        
        <form onSubmit={handleLogin}>
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              value={formData.username}
              required
              onChange={handleChange}
              style={{
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
              }}
            />
          </motion.div>

          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              value={formData.password}
              required
              onChange={handleChange}
              style={{
                backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
              }}
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button 
              type="submit" 
              className={`btn w-100 ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
              style={{
                backdropFilter: 'blur(10px)',
                backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 255, 0.1)'
              }}
            >
              Login
            </button>
          </motion.div>
        </form>

        <motion.p 
          className={`mt-4 text-center ${darkMode ? 'text-white-50' : 'text-muted'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className={darkMode ? 'text-info' : 'text-primary'}
            style={{ textDecoration: 'none' }}
          >
            Register here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}