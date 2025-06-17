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
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      setMessageType("error");
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
        return;
      }

      setMessage("Registration successful! Logging in...");
      setMessageType("success");

      const loginResponse = await fetch("http://localhost:8001/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password
        })
      });

      const loginResult = await loginResponse.json();

      if (loginResponse.ok && loginResult.access_token) {
        localStorage.setItem("token", loginResult.access_token);
        setIsAuthenticated(true);
        navigate("/");
      } else {
        setMessage("Registered but auto-login failed.");
        setMessageType("error");
      }

    } catch {
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
    }
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? 'text-light' : 'text-dark'}`}>
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
        
        <motion.h2 className="text-center mb-4">Register</motion.h2>

        {message && (
          <div className={`alert ${messageType === "success" ? "alert-success" : "alert-danger"}`}>{message}</div>
        )}

        <form onSubmit={handleRegister}>
          {["username", "email", "password", "confirmPassword"].map((field, i) => (
            <motion.div key={field} className="mb-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}>
              <label className="form-label">
                {field === "confirmPassword" ? "Confirm Password" : field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={["password", "confirmPassword"].includes(field) ? "password" : field === "email" ? "email" : "text"}
                name={field}
                className="form-control"
                value={formData[field]}
                required
                onChange={handleChange}
                style={{
                  backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                  color: darkMode ? 'white' : 'black'
                }}
              />
            </motion.div>
          ))}

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
            <button type="submit" className={`btn w-100 ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
              style={{ backdropFilter: 'blur(10px)', backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 255, 0.1)' }}>
              Register
            </button>
          </motion.div>
        </form>

        <motion.p className={`mt-4 text-center ${darkMode ? 'text-white-50' : 'text-muted'}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          Already have an account?{" "}
          <Link to="/login" className={darkMode ? 'text-info' : 'text-primary'} style={{ textDecoration: 'none' }}>
            Login here
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
}
