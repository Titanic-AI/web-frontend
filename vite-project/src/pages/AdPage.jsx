export default function AdPage({ darkMode }) {
  return (
    <div className={`container my-5 ${darkMode ? 'bg-dark text-light' : ''}`}>
      <h2 className={darkMode ? 'text-info' : 'text-primary'} mb-4>🎓 Sponsored Content</h2>
      <p className="lead mb-5">Check out these amazing learning opportunities and offers!</p>

      <div className="row g-4">
        <div className="col-12">
          <div className={`card h-100 shadow-sm ${darkMode ? 'bg-secondary text-light' : ''}`}>
            <div className="card-body d-flex">
              <div className="display-6 me-3">💡</div>
              <div>
                <h5 className="card-title">Learn AI with Titanic Dataset</h5>
                <p className="card-text">
                  Take an interactive ML course using Titanic data. Hands-on with Python and scikit-learn.
                </p>
                <a 
                  href="https://www.kaggle.com/competitions/titanic" 
                  target="_blank" 
                  className={`btn btn-sm ${darkMode ? 'btn-outline-info' : 'btn-outline-primary'}`}
                >
                  Explore on Kaggle
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className={`card h-100 shadow-sm ${darkMode ? 'bg-secondary text-light' : ''}`}>
            <div className="card-body d-flex">
              <div className="display-6 me-3">🚢</div>
              <div>
                <h5 className="card-title">Watch "Secrets of the Titanic"</h5>
                <p className="card-text">
                  A documentary about the Titanic's discovery and its surviving passengers.
                </p>
                <a 
                  href="https://www.nationalgeographic.com/" 
                  target="_blank" 
                  className={`btn btn-sm ${darkMode ? 'btn-outline-info' : 'btn-outline-primary'}`}
                >
                  Watch on NatGeo
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className={`card h-100 shadow-sm ${darkMode ? 'bg-secondary text-light' : ''}`}>
            <div className="card-body d-flex">
              <div className="display-6 me-3">📘</div>
              <div>
                <h5 className="card-title">Student Discounts on Data Science Courses</h5>
                <p className="card-text">
                  Get 70% off top Udemy and Coursera courses with your student ID.
                </p>
                <a 
                  href="https://www.udemy.com" 
                  target="_blank" 
                  className={`btn btn-sm ${darkMode ? 'btn-outline-info' : 'btn-outline-primary'}`}
                >
                  Claim Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}