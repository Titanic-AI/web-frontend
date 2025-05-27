export default function AdPage() {
  return (
    <div className="ad-page-container">
      <h2 className="ad-title">🎓 Sponsored Content</h2>
      <p className="ad-intro">Check out these amazing learning opportunities and offers!</p>

      <div className="ad-grid">
        <div className="ad-item">
          <div className="ad-icon">💡</div>
          <div className="ad-content">
            <h3>Learn AI with Titanic Dataset</h3>
            <p>Take an interactive ML course using Titanic data. Hands-on with Python and scikit-learn.</p>
            <a href="https://www.kaggle.com/competitions/titanic" target="_blank">Explore on Kaggle</a>
          </div>
        </div>

        <div className="ad-item">
          <div className="ad-icon">🚢</div>
          <div className="ad-content">
            <h3>Watch "Secrets of the Titanic"</h3>
            <p>A documentary about the Titanic’s discovery and its surviving passengers.</p>
            <a href="https://www.nationalgeographic.com/" target="_blank">Watch on NatGeo</a>
          </div>
        </div>

        <div className="ad-item">
          <div className="ad-icon">📘</div>
          <div className="ad-content">
            <h3>Student Discounts on Data Science Courses</h3>
            <p>Get 70% off top Udemy and Coursera courses with your student ID.</p>
            <a href="https://www.udemy.com" target="_blank">Claim Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}
