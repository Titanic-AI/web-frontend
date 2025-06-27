import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login({ darkMode, setIsAuthenticated }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage]     = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const primaryColor = darkMode ? "#0dcaf0" : "#0d6efd";
  const hoverColor   = darkMode ? "#0b5ed7" : "#0b5ed7";
  const activeColor  = darkMode ? "#0a58ca" : "#0a58ca";

  const handleChange = (e) => {
    setFormData(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/auth/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password
        }),
      });

      if (!response.ok) {
        let err = "Login failed";
        const ct = response.headers.get("Content-Type") || "";
        if (ct.includes("application/json")) {
          const { detail } = await response.json();
          err = detail || err;
        } else {
          err = await response.text() || err;
        }
        throw new Error(err);
      }

      const { access_token } = await response.json();
      localStorage.setItem("token", access_token);
      setMessage("✅ Login successful!");
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      setMessage(`❌ ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <motion.div
        className="rounded-4 shadow-lg p-4 p-md-5"
        style={{
          width: '100%',
          maxWidth: '450px',
          backdropFilter: 'blur(12px)',
          backgroundColor: darkMode ? 'rgba(30,30,30,0.8)' : 'rgba(255,255,255,0.8)',
          border: darkMode ? '1px solid rgba(255,255,255,0.15)' : '1px solid rgba(0,0,0,0.1)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-center mb-4"
          style={{ color: primaryColor }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome Back
        </motion.h2>

        {message && (
          <motion.div
            className={`alert ${message.includes("✅") ? "alert-success" : "alert-danger"} ${darkMode ? "text-white" : ""}`}
            role="alert"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {message}
          </motion.div>
        )}

        <form onSubmit={handleLogin}>
          <motion.div className="mb-4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              className={`form-control ${darkMode ? 'bg-dark text-white' : ''}`}
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                backgroundColor: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
              }}
            />
          </motion.div>

          <motion.div className="mb-4" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${darkMode ? 'bg-dark text-white' : ''}`}
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                backgroundColor: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
                borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
              }}
            />
          </motion.div>

          <motion.div className="mb-3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
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
              onMouseEnter={e => (e.target.style.background = hoverColor)}
              onMouseLeave={e => (e.target.style.background = primaryColor)}
              onMouseDown={e => (e.target.style.background = activeColor)}
              onMouseUp={e => (e.target.style.background = hoverColor)}
            >
              {isLoading
                ? <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" />
                    Signing In...
                  </>
                : "Login to Your Account"}
            </button>
          </motion.div>

          <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <Link to="/forgot-password" className={`small ${darkMode ? 'text-info' : 'text-primary'}`}>
              Forgot your password?
            </Link>
          </motion.div>
        </form>

        <motion.div className={`mt-4 pt-3 text-center ${darkMode ? 'border-secondary' : 'border-light'}`}
                    style={{ borderTop: '1px solid' }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <p className={`${darkMode ? 'text-white-50' : 'text-muted'} mb-0`}>
            Don’t have an account?{" "}
            <Link to="/register" style={{ color: primaryColor }}>
              Create one
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
