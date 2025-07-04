// src/pages/HistoryPanel.jsx
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function HistoryPage({ darkMode }) {
  const navigate = useNavigate();

  // Fake history data
  const fakeHistory = [
    {
      id: 1,
      model: "RandomForest",
      survived: true,
      probability_of_survival: 0.87,
      timestamp: "2023-05-15T14:30:22Z",
      details: {
        Pclass: 1,
        Sex: "Female",
        Age: 28,
        Fare: 120,
        Embarked: "C",
        Title: "Mrs",
        IsAlone: false
      }
    },
    {
      id: 2,
      model: "SVM",
      survived: false,
      probability_of_survival: 0.32,
      timestamp: "2023-05-14T09:15:45Z",
      details: {
        Pclass: 3,
        Sex: "Male",
        Age: 35,
        Fare: 15,
        Embarked: "S",
        Title: "Mr",
        IsAlone: true
      }
    },
    {
      id: 3,
      model: "LogisticRegression",
      survived: true,
      probability_of_survival: 0.78,
      timestamp: "2023-05-13T18:45:10Z",
      details: {
        Pclass: 2,
        Sex: "Female",
        Age: 22,
        Fare: 45,
        Embarked: "Q",
        Title: "Miss",
        IsAlone: false
      }
    },
    {
      id: 4,
      model: "RandomForest",
      survived: false,
      probability_of_survival: 0.23,
      timestamp: "2023-05-12T11:20:33Z",
      details: {
        Pclass: 3,
        Sex: "Male",
        Age: 40,
        Fare: 8,
        Embarked: "S",
        Title: "Mr",
        IsAlone: true
      }
    },
    {
      id: 5,
      model: "SVM",
      survived: true,
      probability_of_survival: 0.91,
      timestamp: "2023-05-11T16:55:17Z",
      details: {
        Pclass: 1,
        Sex: "Female",
        Age: 32,
        Fare: 150,
        Embarked: "C",
        Title: "Mrs",
        IsAlone: false
      }
    }
  ];

  return (
    <motion.div
      className="min-vh-100 d-flex align-items-center justify-content-center py-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={`container py-4 rounded-4 shadow-lg ${darkMode ? 'text-light' : 'text-dark'}`}
        style={{
          backdropFilter: 'blur(12px)',
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.8)' : 'rgba(255, 255, 255, 0.8)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
          maxWidth: '1200px'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="px-4 px-md-5 py-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <motion.h2 
              className="mb-0"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              Prediction History
            </motion.h2>
            <button
              onClick={() => navigate("/calculator")}
              className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-primary'}`}
            >
              ← Back to Calculator
            </button>
          </div>

          <div className="table-responsive rounded-3"
            style={{
              backdropFilter: 'blur(8px)',
              backgroundColor: darkMode ? 'rgba(40, 40, 50, 0.7)' : 'rgba(255, 255, 255, 0.7)',
              border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)'
            }}
          >
            <table className={`table table-hover ${darkMode ? 'table-dark' : ''}`}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Model</th>
                  <th>Details</th>
                  <th>Result</th>
                  <th>Probability</th>
                  <th>When</th>
                </tr>
              </thead>
              <tbody>
                {fakeHistory.map((prediction, index) => (
                  <motion.tr 
                    key={prediction.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    style={{ cursor: 'pointer' }}
                    whileHover={{
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)'
                    }}
                  >
                    <td>{index + 1}</td>
                    <td>{prediction.model}</td>
                    <td>
                      <div className="d-flex flex-column small">
                        <span>Class: {prediction.details.Pclass}</span>
                        <span>Age: {prediction.details.Age}</span>
                        <span>Sex: {prediction.details.Sex}</span>
                      </div>
                    </td>
                    <td className={prediction.survived ? "text-success fw-bold" : "text-danger fw-bold"}>
                      {prediction.survived ? "Survived" : "Did not survive"}
                    </td>
                    <td>
                      <div className="progress" style={{ height: "8px" }}>
                        <div
                          className={`progress-bar ${prediction.survived ? "bg-success" : "bg-danger"}`}
                          style={{
                            width: `${(prediction.probability_of_survival * 100).toFixed(1)}%`,
                          }}
                        />
                      </div>
                      <small className="text-muted">
                        {(prediction.probability_of_survival * 100).toFixed(1)}%
                      </small>
                    </td>
                    <td>{new Date(prediction.timestamp).toLocaleString()}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          <motion.div 
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <button 
              className={`btn ${darkMode ? 'btn-outline-light' : 'btn-outline-secondary'}`}
              disabled
            >
              Load More
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}