import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Register({ darkMode, setIsAuthenticated }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });

      const result = await response.json();

      if (!response.ok) {
        setMessage(result.detail || "Registration failed.");
        setMessageType("error");
        setIsLoading(false);
        return;
      }

      setMessage("Registration successful! Logging in...");
      setMessageType("success");

      const loginResponse = await fetch("http://localhost:8001/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          username: formData.username,
          password: formData.password
        })
      });

      const loginResult = await loginResponse.json();

      if (loginResponse.ok && loginResult.access_token) {
        localStorage.setItem("token", loginResult.access_token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setMessage("Registered but auto-login failed. Please login manually.");
        setMessageType("error");
      }
    } catch (err) {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    } finally {
      setIsLoading(false);
    }
  };

  // Blue color scheme 
  const primaryColor = darkMode ? "#0dcaf0" : "#0d6efd";
  const hoverColor = darkMode ? "#0b5ed7" : "#0b5ed7";
  const activeColor = darkMode ? "#0a58ca" : "#0a58ca";

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <motion.div className="rounded-4 shadow-lg p-4 p-md-5"
        style={{
          width: '100%',
          maxWidth: '450px',
          backdropFilter: 'blur(12px)',
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}>
        
        <motion.h2 
          className={`text-center mb-4 ${darkMode ? 'text-info' : 'text-primary'}`}
          style={{ color: primaryColor }}
        >
          Create Account
        </motion.h2>

        {message && (
          <motion.div 
            className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleRegister}>
          {["username", "email", "password", "confirmPassword"].map((field, i) => (
            <motion.div 
              key={field} 
              className="mb-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
            >
              <label className="form-label">
                {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={["password", "confirmPassword"].includes(field) ? "password" : field === "email" ? "email" : "text"}
                name={field}
                className={`form-control ${darkMode ? 'bg-dark text-white' : ''}`}
                value={formData[field]}
                required
                onChange={handleChange}
                style={{
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
                }}
              />
            </motion.div>
          ))}

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
          >
            <button 
              type="submit" 
              className="btn w-100 fw-bold py-2"
              disabled={isLoading}
              style={{
                background: primaryColor,
                border: 'none',
                color: 'white',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden',
                zIndex: 1,
              }}
              onMouseEnter={(e) => {
                e.target.style.background = hoverColor;
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = `0 4px 15px ${primaryColor}80`;
              }}
              onMouseLeave={(e) => {
                e.target.style.background = primaryColor;
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
              onMouseDown={(e) => {
                e.target.style.background = activeColor;
              }}
              onMouseUp={(e) => {
                e.target.style.background = hoverColor;
              }}
            >
              {isLoading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Registering...
                </>
              ) : (
                "Register Now"
              )}
            </button>
          </motion.div>
        </form>

        <motion.div 
          className={`mt-4 pt-3 text-center ${darkMode ? 'border-secondary' : 'border-light'}`}
          style={{ borderTop: '1px solid' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <p className={`${darkMode ? 'text-white-50' : 'text-muted'} mb-0`}>
            Already have an account?{" "}
            <Link 
              to="/login" 
              style={{ 
                color: primaryColor,
                textDecoration: 'none',
                fontWeight: 500,
                transition: 'all 0.2s ease'
              }}
              className="hover-underline"
            >
              Sign in here
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}