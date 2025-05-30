// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import Testimonials from "../components/Testimonials";

export default function LandingPage({ darkMode }) {
  const logo = darkMode ? "/src/assets/logo-256.png" : "/src/assets/logo-256-B.png";

  return (
    <motion.div
      className={`min-vh-100 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container py-5 d-flex flex-column justify-content-center" style={{ minHeight: '100vh' }}>
        <div className="text-center py-5">
          <motion.h1
            className="display-3 fw-bold mb-4"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Titanic Survival Prediction App
          </motion.h1>

          <motion.p
            className="lead mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Enter Titanic passenger details and let AI predict their chances of survival.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <a href="/calculator" className="text-decoration-none">
              <button className={`btn btn-lg ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}>
                Try the Calculator
              </button>
            </a>
          </motion.div>

          <motion.img
            src={logo}
            alt="Titanic ship"
            className="img-fluid rounded my-5 shadow"
            style={{ maxWidth: "200px" }}
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 1.2, type: "spring" }}
          />
        </div>

        <div className="py-5">
          <h2 className="text-center mb-4">How It Works</h2>
          <ul className="list-unstyled">
            <li className="mb-3">
              <span className="me-2">🧍</span>
              Enter passenger details: age, gender, class, etc.
            </li>
            <li className="mb-3">
              <span className="me-2">💡</span>
              Our AI predicts survival based on Titanic dataset patterns.
            </li>
            <li className="mb-3">
              <span className="me-2">📊</span>
              Register to view your saved predictions and history.
            </li>
          </ul>
        </div>

        <Testimonials darkMode={darkMode} />
      </div>
    </motion.div>
  );
}