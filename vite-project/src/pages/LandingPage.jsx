// src/pages/LandingPage.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Testimonials from "../components/Testimonials";
import logoLight from "../assets/logo-256-B.png";
import logoDark from "../assets/logo-256.png";

export default function LandingPage({ darkMode }) {
  const logo = darkMode ? logoDark : logoLight;
  const navigate = useNavigate();

  return (
    <motion.div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className={`container py-5 my-5 rounded-4 shadow-lg ${darkMode ? 'text-light' : 'text-dark'}`}
        style={{
          backdropFilter: 'blur(10px)',
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.75)' : 'rgba(255, 255, 255, 0.75)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)',
          maxWidth: '1200px'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="px-4 px-md-5 py-4 d-flex flex-column justify-content-center">
 <div className="text-center py-3 py-md-5">
  <motion.h1
    className="display-3 fw-bold mb-4"
    initial={{ opacity: 0, y: -50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
  >
    🚢 7UP: Titanic Survivor AI
  </motion.h1>

  <motion.p
    className="lead mb-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.5, duration: 1 }}
  >
    Predict Your Fate with Cutting-Edge AI
  </motion.p>

  <motion.p
    className="mb-5"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.8, duration: 1 }}
  >
    Ever wondered if you would have survived the Titanic disaster? Our AI-powered web app analyzes historical passenger data to reveal your odds—and teaches you how AI works along the way!
  </motion.p>

  <motion.img
    src={logo}
    alt="Titanic ship"
    className="img-fluid rounded my-5 shadow"
    style={{
      maxWidth: "200px",
      filter: darkMode ? 'brightness(0.9)' : 'brightness(1)'
    }}
    initial={{ x: "-100vw", opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    transition={{ delay: 0.9, duration: 1.2, type: "spring" }}
  />

  <motion.div
    className="py-4 text-start"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.0, duration: 1 }}
  >
    
    <motion.h3 
      className="mb-3 text-center"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
    >
      How It Works
    </motion.h3>

    <motion.div 
      className="mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4 }}
    >
      <h5 className="fw-bold">🔹 Survival Calculator</h5>
      <ul className="list-unstyled ps-3">
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          • Input passenger details like <strong>Class (1st/2nd/3rd)</strong>, <strong>Age</strong>, <strong>Gender</strong>, <strong>Fare</strong>, and more.
        </motion.li>
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
        >
          • Watch the <strong>AI prediction update in real-time</strong> as you tweak variables.
        </motion.li>
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.7 }}
        >
          • Compare models (<strong>Random Forest</strong>, <strong>SVM</strong>, or custom-trained ones) to see how different algorithms interpret your data.
        </motion.li>
      </ul>
    </motion.div>

    <motion.div 
      className="mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
    >
      <h5 className="fw-bold">🔹 For Logged-In Users</h5>
      <ul className="list-unstyled ps-3">
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.9 }}
        >
         • Unlock advanced features: <strong>Combine multiple AI models</strong>, save your last 10 predictions, and dive deeper into how AI decisions are made.
        </motion.li>
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2.0 }}
        >
         • <strong>Admin?</strong> Train custom models using specific features and manage existing ones.
        </motion.li>
      </ul>
    </motion.div>

    <motion.div 
      className="mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.1 }}
    >
      <h5 className="fw-bold">🔹 Learn & Share</h5>
      <ul className="list-unstyled ps-3">
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2.2 }}
        >
         • Explore explanations for each input (e.g., why "Class" mattered).
        </motion.li>
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2.3 }}
        >
         • Promote your curiosity: Share results with <strong>#TitanicAI</strong> and check out our AI course to build apps like this yourself!
        </motion.li>
      </ul>
    </motion.div>

    <motion.div 
      className="mb-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4 }}
    >
      <h5 className="fw-bold">🔹 Behind the Scenes</h5>
      <ul className="list-unstyled ps-3">
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
         • Powered by <strong>Docker</strong>, <strong>FastAPI</strong>, and <strong>GitLab CI/CD</strong> for seamless performance.
        </motion.li>
        <motion.li 
          className="mb-2"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 2.6 }}
        >
         • Secure, containerized, and tested nightly for reliability.
        </motion.li>
      </ul>
    </motion.div>
  </motion.div>

  <motion.div
    className="d-flex justify-content-center gap-3 flex-wrap"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.8, duration: 0.6 }}
  >
    <button
      onClick={() => navigate("/calculator")}
      className={`btn btn-lg ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
    >
      👉 Ready to test your survival? Try Now
    </button>
    <button
      onClick={() => navigate("/ad")}
      className={`btn btn-lg ${darkMode ? 'btn-outline-light' : 'btn-outline-primary'}`}
    >
      👉 Want to master AI? Explore Our Courses
    </button>
  </motion.div>


</div>

          <Testimonials darkMode={darkMode} />
        </div>
      </motion.div>
    </motion.div>
  );
}