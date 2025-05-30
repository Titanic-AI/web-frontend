// src/pages/AdPage.jsx
import { motion } from "framer-motion";

export default function AdPage({ darkMode }) {
  const ads = [
    {
      emoji: "💡",
      title: "Learn AI with Titanic Dataset",
      description: "Take an interactive ML course using Titanic data. Hands-on with Python and scikit-learn.",
      link: "https://www.kaggle.com/competitions/titanic",
      linkText: "Explore on Kaggle"
    },
    {
      emoji: "🚢",
      title: "Watch 'Secrets of the Titanic'",
      description: "A documentary about the Titanic's discovery and its surviving passengers.",
      link: "https://www.nationalgeographic.com/",
      linkText: "Watch on NatGeo"
    },
    {
      emoji: "📘",
      title: "Student Discounts on Data Science Courses",
      description: "Get 70% off top Udemy and Coursera courses with your student ID.",
      link: "https://www.udemy.com",
      linkText: "Claim Now"
    }
  ];

  return (
    <div className={`min-vh-100 d-flex align-items-center ${darkMode ? 'text-light' : 'text-dark'}`}>
      <motion.div
        className="container my-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="rounded-4 shadow-lg p-4 p-md-5 mb-5"
          style={{
            backdropFilter: 'blur(12px)',
            backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
            border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)'
          }}
        >
          <motion.h2 
            className={`${darkMode ? 'text-info' : 'text-primary'} mb-4`}
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ delay: 0.2 }}
          >
            🎓 Sponsored Content
          </motion.h2>
          <motion.p 
            className="lead mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Check out these amazing learning opportunities and offers!
          </motion.p>
        </motion.div>

        <div className="row g-4">
          {ads.map((ad, index) => (
            <motion.div 
              className="col-12"
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.1) }}
            >
              <div 
                className={`rounded-4 p-4 d-flex h-100`}
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: darkMode ? 'rgba(50, 50, 50, 0.7)' : 'rgba(240, 240, 240, 0.7)',
                  border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.05)',
                  boxShadow: darkMode ? '0 4px 20px rgba(0, 0, 0, 0.3)' : '0 4px 20px rgba(0, 0, 0, 0.1)'
                }}
              >
                <div className="display-4 me-4">{ad.emoji}</div>
                <div>
                  <h5 className="card-title">{ad.title}</h5>
                  <p className="card-text mb-3">{ad.description}</p>
                  <a 
                    href={ad.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`btn btn-sm ${darkMode ? 'btn-outline-info' : 'btn-outline-primary'}`}
                    style={{
                      backdropFilter: 'blur(10px)',
                      backgroundColor: darkMode ? 'rgba(0, 200, 255, 0.1)' : 'rgba(0, 100, 255, 0.1)'
                    }}
                  >
                    {ad.linkText}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}