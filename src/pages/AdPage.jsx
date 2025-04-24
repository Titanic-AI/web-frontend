import React from 'react';

export default function AdPage() {
  return (
    <div>
      <header style={headerStyle}>
        <h1>Learn How to Build AI-Powered Web Applications</h1>
        <p>Join our comprehensive course and master the skills to create real-world AI web applications, just like our Titanic Survivor Prediction model!</p>
      </header>

      <section style={featuresStyle}>
        <h2>Course Highlights</h2>
        <ul>
          <li>Beginner-friendly tutorials on AI and machine learning.</li>
          <li>Step-by-step guidance in building AI-based web applications.</li>
          <li>Hands-on experience with projects like Titanic Survival Prediction.</li>
          <li>Learn the fundamentals of Python, JavaScript, and AI integration.</li>
        </ul>
      </section>

      <section style={ctaStyle}>
        <h3>Ready to Get Started?</h3>
        <p>Take your AI skills to the next level. Enroll today and build the web apps of tomorrow!</p>
        <button onClick={() => window.location.href = '/enroll'}>Enroll Now</button>
      </section>

      <footer style={footerStyle}>
        <p>Have questions? <a href="/contact">Contact Us</a></p>
      </footer>
    </div>
  );
}

// Inline styles
const headerStyle = {
  backgroundColor: '#007bff',
  color: 'white',
  padding: '40px 20px',
  textAlign: 'center',
};

const featuresStyle = {
  backgroundColor: 'white',
  padding: '20px',
  margin: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
};

const ctaStyle = {
  textAlign: 'center',
  backgroundColor: '#f1f1f1',
  padding: '30px',
  marginTop: '20px',
};

const footerStyle = {
  textAlign: 'center',
  marginTop: '30px',
  padding: '20px',
  backgroundColor: '#333',
  color: 'white',
};
