// src/pages/AdPage.jsx
import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdPage({ darkMode }) {
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const courseFeatures = [
    {
      icon: "🤖",
      title: "AI Integration",
      description: "Learn to integrate machine learning models directly into web applications"
    },
    {
      icon: "🚢",
      title: "Real-World Project",
      description: "Build a complete Titanic survival predictor with multiple ML algorithms"
    },
    {
      icon: "🔄",
      title: "Full Stack Mastery",
      description: "Frontend to backend connection with modern JavaScript frameworks"
    },
    {
      icon: "🎓",
      title: "Certification",
      description: "Earn a verifiable certificate upon completion"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setShowEnrollModal(false);
      setIsSubmitted(false);
      setFormData({ name: "", email: "" });
    }, 3000);
  };

  const openDemo = () => {
    navigate("/calculator"); // Redirect to your calculator page
  };

  return (
    <div className={`min-vh-100 d-flex flex-column ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      {/* Marquee Offer Banner */}
      <div 
        className={`py-2 ${darkMode ? 'bg-info text-dark' : 'bg-primary text-white'}`}
        style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}
      >
        <motion.div
          animate={{ x: ['100%', '-100%'] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          style={{ display: 'inline-block' }}
        >
          <span className="me-5">🔥 LIMITED TIME OFFER: Use coupon code <strong>7UP20%OFF</strong> for 20% discount!</span>
          <span className="me-5">🎉 Next cohort starts June 15 - Enroll now!</span>
          <span className="me-5">🚀 Build 6 AI projects including Titanic Survival Predictor</span>
        </motion.div>
      </div>

      <div className="container my-5 flex-grow-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Section */}
          <motion.div
            className="rounded-4 shadow-lg p-4 p-md-5 mb-5 text-center"
            style={{
              background: darkMode 
                ? 'linear-gradient(135deg, rgba(10,30,50,0.9) 0%, rgba(20,50,80,0.9) 100%)'
                : 'linear-gradient(135deg, rgba(100,180,255,0.2) 0%, rgba(0,120,255,0.2) 100%)',
              border: darkMode ? '1px solid rgba(0, 200, 255, 0.3)' : '1px solid rgba(0, 100, 255, 0.2)'
            }}
          >
            <h1 className={`display-4 fw-bold mb-4 ${darkMode ? 'text-info' : 'text-primary'}`}>
              AI-Powered Web Apps Masterclass
            </h1>
            <p className="lead fs-3 mb-4">
              Build the Titanic Survival Predictor and 5 other real projects
            </p>
            <div>
              <button 
                onClick={() => setShowEnrollModal(true)}
                className={`btn btn-lg ${darkMode ? 'btn-info' : 'btn-primary'} px-4 py-3 fw-bold me-3`}
              >
                Enroll Now - 50% Off
              </button>
              <button 
                onClick={openDemo}
                className={`btn btn-lg ${darkMode ? 'btn-outline-info' : 'btn-outline-primary'} px-4 py-3 fw-bold`}
              >
                Try Live Demo
              </button>
            </div>
          </motion.div>

          {/* Course Features */}
          <div className="row g-4 mb-5">
            {courseFeatures.map((feature, index) => (
              <motion.div 
                className="col-md-6 col-lg-3"
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
              >
                <div className={`rounded-4 p-4 h-100 d-flex flex-column ${darkMode ? 'bg-dark' : 'bg-white'} shadow-sm`}>
                  <div className="display-3 mb-3">{feature.icon}</div>
                  <h4 className="mb-3">{feature.title}</h4>
                  <p className="mb-0">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Project Showcase */}
          <div className={`rounded-4 p-4 p-md-5 mb-5 ${darkMode ? 'bg-dark' : 'bg-white'} shadow-sm`}>
            <div className="row align-items-center">
              <div className="col-lg-6 mb-4 mb-lg-0">
                <h2 className={`display-5 fw-bold mb-4 ${darkMode ? 'text-info' : 'text-primary'}`}>
                  Featured Project: Titanic Survival Predictor
                </h2>
                <p className="lead mb-4">
                  Learn by building a complete web application that predicts passenger survival using 5 different machine learning models.
                </p>
                <ul className="list-unstyled">
                  <li className="mb-2">✅ Frontend with React.js</li>
                  <li className="mb-2">✅ Backend API with Flask/FastAPI</li>
                  <li className="mb-2">✅ Multiple ML model integration (KNN, SVM, etc.)</li>
                  <li className="mb-2">✅ Deployment strategies</li>
                </ul>
                <button 
                  onClick={openDemo}
                  className={`btn ${darkMode ? 'btn-outline-info' : 'btn-outline-primary'} mt-3`}
                >
                  Try Live Demo
                </button>
              </div>
              <div className="col-lg-6">
                <div 
                  className="rounded-4 overflow-hidden position-relative"
                  style={{
                    aspectRatio: '16/9',
                    background: darkMode ? '#222' : '#eee',
                    border: darkMode ? '1px solid #444' : '1px solid #ddd'
                  }}
                >
                  <div className="w-100 h-100 d-flex align-items-center justify-content-center">
                    <span className={`display-1 ${darkMode ? 'text-info' : 'text-primary'}`}>🚢 + 🤖 = 💡</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials */}
          <div className="text-center mb-5">
            <h3 className="mb-4">What Our Students Say</h3>
            <div className="row g-4">
              <div className="col-md-4">
                <div className={`p-4 rounded-4 h-100 ${darkMode ? 'bg-dark' : 'bg-white'} shadow-sm`}>
                  <p>"The Titanic project alone was worth the price! I learned so much about connecting ML models to web apps."</p>
                  <div className="fw-bold">— Computer Science Student</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`p-4 rounded-4 h-100 ${darkMode ? 'bg-dark' : 'bg-white'} shadow-sm`}>
                  <p>"Finally a course that shows the complete pipeline from data science to deployment."</p>
                  <div className="fw-bold">— Data Science Bootcamp Grad</div>
                </div>
              </div>
              <div className="col-md-4">
                <div className={`p-4 rounded-4 h-100 ${darkMode ? 'bg-dark' : 'bg-white'} shadow-sm`}>
                  <p>"The multiple model comparison approach gave me deep understanding of ML in production."</p>
                  <div className="fw-bold">— Junior ML Engineer</div>
                </div>
              </div>
            </div>
          </div>

          {/* Final CTA */}
          <div className="text-center">
            <h2 className="display-6 mb-4">Ready to Build AI Web Applications?</h2>
            <button 
              onClick={() => setShowEnrollModal(true)}
              className={`btn ${darkMode ? 'btn-info' : 'btn-primary'} btn-lg px-5 py-3 fw-bold`}
            >
              Join Now - Limited Seats Available
            </button>
            <p className="small mt-3">Next cohort starts: June 15, 2024</p>
          </div>
        </motion.div>
      </div>

      {/* Enroll Modal */}
      {showEnrollModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.7)', position: 'fixed', top: 0 }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className={`modal-content ${darkMode ? 'bg-dark' : 'bg-light'}`}>
              <div className="modal-header">
                <h5 className="modal-title">Join the Waitlist</h5>
                <button 
                  type="button" 
                  className={`btn-close ${darkMode ? 'btn-close-white' : ''}`}
                  onClick={() => {
                    setShowEnrollModal(false);
                    setIsSubmitted(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {isSubmitted ? (
                  <div className="text-center py-4">
                    <div className={`display-4 mb-3 ${darkMode ? 'text-info' : 'text-success'}`}>✓</div>
                    <h4>Thank you for your interest!</h4>
                    <p>We'll contact you at <strong>{formData.email}</strong> with course details.</p>
                    <p>Don't forget to use coupon code <strong>7UP20%OFF</strong> for 20% discount!</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label
      htmlFor="name"
      className={`form-label ${darkMode ? 'text-light' : ''}`}
    >
      Full Name
    </label>
    <input
      type="text"
      id="name"
      name="name"
      value={formData.name}
      onChange={handleInputChange}
      required
      placeholder="John Doe"
      className={`
        form-control
        ${darkMode
          ? 'bg-secondary text-light border-light placeholder-white'
          : ''}
      `}
    />
  </div>

  <div className="mb-3">
    <label
      htmlFor="email"
      className={`form-label ${darkMode ? 'text-light' : ''}`}
    >
      Email address
    </label>
    <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleInputChange}
      required
      placeholder="you@example.com"
      className={`
        form-control
        ${darkMode
          ? 'bg-secondary text-light border-light placeholder-white'
          : ''}
      `}
    />
  </div>

  <div className="d-grid">
    <button
      type="submit"
      className={`btn py-2 ${
        darkMode ? 'btn-outline-light' : 'btn-primary'
      }`}
    >
      Join Waitlist
    </button>
  </div>
</form>

                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}