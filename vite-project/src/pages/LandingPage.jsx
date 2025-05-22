// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import Testimonials from "./Testimonials";

export default function LandingPage() {
  return (
    <motion.div
      className="landing-hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.h1
        className="landing-title"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Titanic Survival Prediction App
      </motion.h1>

      <motion.p
        className="landing-subtitle"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Enter Titanic passenger details and let AI predict their chances of survival.
      </motion.p>

      <motion.a
        href="/calculator"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <button className="cta-button">Try the Calculator</button>
      </motion.a>

      <motion.img
        src="/src/assets/logo-256.png"
        alt="Titanic ship"
        className="landing-image"
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1.2, type: "spring" }}
      />

      <div className="features">
        <h2>How It Works</h2>
        <ul>
          <li>🧍 Enter passenger details: age, gender, class, etc.</li>
          <li>💡 Our AI predicts survival based on Titanic dataset patterns.</li>
          <li>📊 Register to view your saved predictions and history.</li>
        </ul>

        {/* ✅ ROTATING TESTIMONIALS HERE */}
        <Testimonials />
      </div>
    </motion.div>
  );
}
