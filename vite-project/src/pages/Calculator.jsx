// src/pages/Calculator.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Calculator({ darkMode, isAuthenticated }) {
  // ─── form state ────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState({
    Pclass: "1",
    Sex: "0",
    Age: "",
    Fare: "",
    Embarked: "0",
    Title: "1",
    IsAlone: "0",
  });

  // ─── which models to run ───────────────────────────────────────────────────
  const ALL_MODELS = [
    "logistic",
    "KNN",
    "DecisionTree",
    "RandomForest",
    "LinearSVM",
    "SVM",
    "NaiveBayes",
    "Perceptron",
    "SGD",
  ];
  const ANON_MODELS = ["RandomForest", "SVM"];
  const models = isAuthenticated ? ALL_MODELS : ANON_MODELS;

  // ─── results & history ────────────────────────────────────────────────────
  const [results, setResults] = useState([]);     // side-by-side
  const [history, setHistory] = useState([]);     // last 10
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Field descriptions for tooltips
  const fieldDescriptions = {
    Pclass: "Passenger Class: 1st = Upper, 2nd = Middle, 3rd = Lower",
    Sex: "Sex of the traveler: Male or Female",
    Age: "Age in years",
    Fare: "Passenger fare in USD",
    Embarked: "Port of Embarkation: C = Cherbourg, Q = Queenstown, S = Southampton",
    Title: "Title: Mr, Miss, Mrs, Master, or Rare titles",
    IsAlone: "Family Status: Traveling alone or with family"
  };

  // ─── categorize helpers ───────────────────────────────────────────────────
  const categorizeAge = (age) => {
    const n = parseFloat(age);
    if (isNaN(n)) return null;
    if (n <= 16) return 0;
    if (n <= 32) return 1;
    if (n <= 48) return 2;
    if (n <= 64) return 3;
    return 4;
  };
  const categorizeFare = (fare) => {
    const n = parseFloat(fare);
    if (isNaN(n)) return null;
    if (n <= 7.91) return 0;
    if (n <= 14.454) return 1;
    if (n <= 31) return 2;
    return 3;
  };

  // ─── fetch history when logged in ─────────────────────────────────────────
  useEffect(() => {
    if (!isAuthenticated) {
      setHistory([]);
      return;
    }
    (async () => {
      const token = localStorage.getItem("token");
      const resp = await fetch("/api/predict/history", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        setHistory(data.slice(-10));
      }
    })();
  }, [isAuthenticated]);

  // ─── perform predictions ──────────────────────────────────────────────────
  const predictSurvival = async () => {
    if (!formData.Age || !formData.Fare) {
      setError("Please fill in Age and Fare fields");
      return;
    }
    setLoading(true);
    setError(null);

    const payload = {
      Pclass: parseInt(formData.Pclass, 10),
      Sex: parseInt(formData.Sex, 10),
      Age: categorizeAge(formData.Age),
      Fare: categorizeFare(formData.Fare),
      Embarked: parseInt(formData.Embarked, 10),
      Title: parseInt(formData.Title, 10),
      IsAlone: parseInt(formData.IsAlone, 10),
    };

    try {
      const token = localStorage.getItem("token");
      const fetches = models.map((model) =>
        fetch(`/predict/${model}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isAuthenticated && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        }).then((r) => {
          if (!r.ok) throw new Error(`${model}: ${r.statusText}`);
          return r.json();
        })
      );

      const allResults = await Promise.all(fetches);
      setResults(allResults);

      // update history for logged-in
      if (isAuthenticated) {
        const resp = await fetch("/api/predict/history", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (resp.ok) {
          const data = await resp.json();
          setHistory(data.slice(-10));
        }
      }
    } catch (err) {
      setError(err.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // ─── on input change, auto-predict ────────────────────────────────────────
  useEffect(() => {
    if (formData.Age && formData.Fare) {
      const timer = setTimeout(predictSurvival, 1000);
      return () => clearTimeout(timer);
    } else {
      setResults([]);
    }
  }, [
    formData.Pclass,
    formData.Sex,
    formData.Age,
    formData.Fare,
    formData.Embarked,
    formData.Title,
    formData.IsAlone,
    isAuthenticated,
  ]);

  // ─── handlers ─────────────────────────────────────────────────────────────
  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;

    if (name === "Age") {
      // allow clearing the field
      if (v !== "") {
        // clamp to 0–100, no decimals
        const num = Math.round(Number(v));
        v = String(Math.max(0, Math.min(100, num)));
      }
    }

    if (name === "Fare") {
      // allow clearing the field
      if (v !== "") {
        // clamp to 0–500, no decimals (changed from float to integer)
        const num = Math.round(Number(v));
        v = String(Math.max(0, Math.min(500, num)));
      }
    }

    setFormData((fd) => ({ ...fd, [name]: v }));
  };

  function resetForm() {
    setFormData({
      Pclass: "1",
      Sex: "0",
      Age: "",
      Fare: "",
      Embarked: "0",
      Title: "1",
      IsAlone: "0",
    });
  }

  // ─── render ───────────────────────────────────────────────────────────────
  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? "text-light" : "text-dark"}`}
      style={{ backgroundColor: 'transparent' }}
    >
      <motion.div
        className="rounded-4 shadow-lg p-4 p-md-5"
        style={{
          width: "100%",
          maxWidth: "700px",
          backdropFilter: "blur(16px)",
          backgroundColor: darkMode
            ? "rgba(30, 30, 30, 0.8)"
            : "rgba(255, 255, 255, 0.8)",
          border: darkMode
            ? "1px solid rgba(255, 255, 255, 0.2)"
            : "1px solid rgba(0, 0, 0, 0.15)",
          boxShadow: darkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.5)"
            : "0 8px 32px rgba(0, 0, 0, 0.1)"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4">Titanic Survival Calculator</h2>

        {error && (
          <div className="alert alert-danger mb-3 rounded-3"
            style={{
              backdropFilter: 'blur(8px)',
              backgroundColor: darkMode ? 'rgba(120, 30, 30, 0.8)' : 'rgba(220, 53, 69, 0.2)',
              border: darkMode ? '1px solid rgba(255, 100, 100, 0.3)' : '1px solid rgba(220, 53, 69, 0.3)'
            }}
          >
            {error}
          </div>
        )}

        {/* ── Input fields ────────────────────────────────────────── */}
        <div className="row g-3">
          {[
            { name: "Pclass", label: "Passenger Class", type: "select", options: ["1", "2", "3"] },
            { name: "Sex", label: "Sex", type: "select", options: ["Male", "Female"], values: ["0", "1"] },
            { 
              name: "Age", 
              label: "Age", 
              type: "number", 
              placeholder: "0-100", 
              min: 0, 
              max: 100,
              style: {
                color: darkMode ? '#fff' : '#000',
                '::placeholder': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
                }
              }
            },
            { 
              name: "Fare", 
              label: "Fare", 
              type: "number", 
              placeholder: "0-500", 
              min: 0, 
              max: 500,
              style: {
                color: darkMode ? '#fff' : '#000',
                '::placeholder': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
                }
              }
            },
            { name: "Embarked", label: "Embarked", type: "select", options: ["Southampton (S)", "Cherbourg (C)", "Queenstown (Q)"], values: ["0", "1", "2"] },
            { name: "Title", label: "Title", type: "select", options: ["Mr", "Miss", "Mrs", "Master", "Rare"], values: ["1", "2", "3", "4", "5"] },
            { name: "IsAlone", label: "Family Status", type: "select", options: ["Alone", "With Family"], values: ["0", "1"] }
          ].map((field) => (
            <div key={field.name} className={`col-md-${field.name === "IsAlone" ? "6" : "6"}`}>
              <label className="form-label d-flex align-items-center">
                {field.label}
                <span 
                  className="ms-2" 
                  title={fieldDescriptions[field.name]}
                  style={{ cursor: 'help' }}
                >
                  <span 
                    style={{
                      display: 'inline-block',
                      width: '18px',
                      height: '18px',
                      borderRadius: '50%',
                      backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                      textAlign: 'center',
                      lineHeight: '18px',
                      fontSize: '12px',
                      fontWeight: 'bold'
                    }}
                  >
                    ⓘ
                  </span>
                </span>
              </label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  className="form-control"
                  value={formData[field.name]}
                  onChange={handleChange}
                  style={{
                    backdropFilter: 'blur(8px)',
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    color: darkMode ? '#fff' : '#000'
                  }}
                >
                  {field.options.map((opt, i) => (
                    <option 
                      key={opt} 
                      value={field.values ? field.values[i] : opt}
                      style={{
                        backgroundColor: darkMode ? '#333' : '#fff',
                        color: darkMode ? '#fff' : '#000'
                      }}
                    >
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  className="form-control"
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  min={field.min}
                  max={field.max}
                  style={{
                    backdropFilter: 'blur(8px)',
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    color: darkMode ? '#fff' : '#000',
                    '::placeholder': {
                      color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)'
                    }
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* ── Actions ─────────────────────────────────────────────── */}
        <div className="mt-4 d-flex gap-2">
          <motion.button
            onClick={predictSurvival}
            className="btn flex-grow-1 fw-bold py-2"
            style={{
              fontSize: "1.1rem",
              background: darkMode ? "#0d6efd" : "#0d6efd",
              border: "none",
              color: "white",
              transition: "all .3s ease",
              backdropFilter: "blur(6px)",
              transform: "translateY(0)"
            }}
            disabled={loading}
            onMouseEnter={(e) => e.target.style.background = "#0b5ed7"}
            onMouseLeave={(e) => e.target.style.background = darkMode ? "#0d6efd" : "#0d6efd"}
            onMouseDown={(e) => e.target.style.background = "#0a58ca"}
            onMouseUp={(e) => e.target.style.background = "#0b5ed7"}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 6px 18px rgba(13, 110, 253, 0.45)"
            }}
            whileTap={{
              scale: 0.98,
              boxShadow: "0 2px 8px rgba(13, 110, 253, 0.25)"
            }}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Predicting...
              </>
            ) : (
              <>
                <i className="bi bi-calculator-fill me-2"></i>
                Predict Survival
              </>
            )}
          </motion.button>

          <button
            onClick={resetForm}
            className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-secondary"
              }`}
            style={{
              borderWidth: "2px",
              fontWeight: "500"
            }}
          >
            <i className="bi bi-arrow-counterclockwise me-1"></i>
            Reset
          </button>
        </div>

        {/* ── Side-by-side Results ──────────────────────────────── */}
        {results.length > 0 && ( 
          <div className="mt-4">
            <div className="row g-3">
              {results.map((r) => (
                <div key={r.model} className="col-md-6">
                  <div
                    className="p-3 mb-3 rounded-3"
                    style={{
                      backdropFilter: "blur(8px)",
                      backgroundColor: darkMode
                        ? "rgba(40, 40, 50, 0.7)"
                        : "rgba(255, 255, 255, 0.7)",
                      border: darkMode
                        ? "1px solid rgba(255, 255, 255, 0.2)"
                        : "1px solid rgba(0, 0, 0, 0.1)",
                      boxShadow: darkMode
                        ? "0 4px 16px rgba(0, 0, 0, 0.3)"
                        : "0 4px 16px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <h5 className="text-center mb-3">{r.model}</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Result:</span>
                      <span
                        className={
                          r.survived
                            ? "text-success fw-bold"
                            : "text-danger fw-bold"
                        }
                      >
                        {r.survived ? "Survived" : "Did not survive"}
                      </span>
                    </div>
                    {r.probability_of_survival != null && (
                      <>
                        <div className="progress mt-2" style={{ 
                          height: "10px",
                          backdropFilter: 'blur(4px)',
                          backgroundColor: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.1)'
                        }}>
                          <div
                            className={`progress-bar ${r.survived ? "bg-success" : "bg-danger"}`}
                            style={{
                              width: `${(r.probability_of_survival * 100).toFixed(1)}%`,
                            }}
                          />
                        </div>
                        <small className="text-muted d-block text-end mt-1">
                          {(r.probability_of_survival * 100).toFixed(1)}% probability
                        </small>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── History Table ─────────────────────────────────────── */}
        {isAuthenticated && history.length > 0 && (
          <div className="mt-5">
            <h5>Prediction History</h5>
            <div className="table-responsive rounded-3"
              style={{
                backdropFilter: 'blur(8px)',
                backgroundColor: darkMode ? 'rgba(40, 40, 50, 0.7)' : 'rgba(255, 255, 255, 0.7)',
                border: darkMode ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)'
              }}
            >
              <table className={`table table-sm ${darkMode ? 'table-dark' : ''}`}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Model</th>
                    <th>Result</th>
                    <th>Prob</th>
                    <th>When</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{h.model}</td>
                      <td className={h.survived ? "text-success" : "text-danger"}>
                        {h.survived ? "✓ Survived" : "✗ Perished"}
                      </td>
                      <td>{(h.probability_of_survival * 100).toFixed(1)}%</td>
                      <td>{new Date(h.timestamp).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}