// src/pages/Calculator.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Calculator({ darkMode }) {
  const [formData, setFormData] = useState({
    Pclass: "1",
    Sex: "0",
    Age: "",
    Fare: "",
    Embarked: "0",
    Title: "1",
    IsAlone: "0"
  });

  const [selectedModel, setSelectedModel] = useState("logistic");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categorizeAge = (age) => {
    if (!age) return null;
    const numAge = parseFloat(age);
    if (numAge <= 16) return 0;
    if (numAge <= 32) return 1;
    if (numAge <= 48) return 2;
    if (numAge <= 64) return 3;
    return 4;
  };

  const categorizeFare = (fare) => {
    if (!fare) return null;
    const numFare = parseFloat(fare);
    if (numFare <= 7.91) return 0;
    if (numFare <= 14.454) return 1;
    if (numFare <= 31) return 2;
    return 3;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    const validators = {
      Pclass: (v) => ["1", "2", "3"].includes(v),
      Sex: (v) => v === "0" || v === "1",
      Age: (v) => parseFloat(v) >= 0 && parseFloat(v) <= 100,
      Fare: (v) => parseFloat(v) >= 0 && parseFloat(v) <= 500,
      Embarked: (v) => ["0", "1", "2"].includes(v),
      Title: (v) => ["1", "2", "3", "4", "5"].includes(v),
      IsAlone: (v) => v === "0" || v === "1"
    };

    if (validators[name] && !validators[name](value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({
      Pclass: "1",
      Sex: "0",
      Age: "",
      Fare: "",
      Embarked: "0",
      Title: "1",
      IsAlone: "0"
    });
    setPrediction(null);
    setError(null);
  };

  const predictSurvival = async () => {
    if (!formData.Age || !formData.Fare) {
      setError("Please fill in Age and Fare fields");
      return;
    }

    setLoading(true);
    setError(null);
    
    try {
      const requestData = {
        Pclass: parseInt(formData.Pclass),
        Sex: parseInt(formData.Sex),
        Age: categorizeAge(formData.Age),
        Fare: categorizeFare(formData.Fare),
        Embarked: parseInt(formData.Embarked),
        Title: parseInt(formData.Title),
        IsAlone: parseInt(formData.IsAlone)
      };

      const response = await fetch(`http://localhost:8000/predict/${selectedModel}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setPrediction({
        ...result,
        // Handle cases where probability might be missing
        probability: result.probability_of_survival ?? null
      });
    } catch (err) {
      console.error("Prediction error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Auto-update predictions when form changes
  useEffect(() => {
    if (formData.Age && formData.Fare) {
      const timer = setTimeout(() => {
        predictSurvival();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [formData, selectedModel]);

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? "text-light" : "text-dark"}`}>
      <motion.div
        className="rounded-4 shadow-lg p-4 p-md-5"
        style={{
          width: "100%",
          maxWidth: "600px",
          backdropFilter: "blur(12px)",
          backgroundColor: darkMode ? "rgba(30, 30, 30, 0.85)" : "rgba(255, 255, 255, 0.85)",
          border: darkMode ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid rgba(0, 0, 0, 0.1)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4">Titanic Survival Calculator</h2>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        {/* Model Selection */}
        <div className="mb-4">
          <label className="form-label">Select ML Model</label>
          <select
            className="form-control"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="logistic">Logistic Regression</option>
            <option value="KNN">K-Nearest Neighbors</option>
            <option value="DecisionTree">Decision Tree</option>
            <option value="RandomForest">Random Forest</option>
            <option value="LinearSVM">Linear SVM</option>
            <option value="SVM"> SVM</option>
            <option value="NaiveBayes">NaiveBayes</option>
            <option value="Perceptron">Perceptron</option>
            <option value="SGD">Stochastic Gradient Descent</option>
            
          </select>
        </div>

        <div className="row g-3">
          {[
            { name: "Pclass", label: "Passenger Class", type: "select", options: ["1", "2", "3"] },
            { name: "Sex", label: "Sex", type: "select", options: [{ value: "0", label: "Male" }, { value: "1", label: "Female" }] },
            { name: "Age", label: "Age", type: "number", placeholder: "0-100", min: 0, max: 100, required: true },
            { name: "Fare", label: "Fare", type: "number", step: "0.01", placeholder: "0-500", min: 0, max: 500, required: true },
            {
              name: "Embarked",
              label: "Embarked",
              type: "select",
              options: [
                { value: "0", label: "Southampton (S)" },
                { value: "1", label: "Cherbourg (C)" },
                { value: "2", label: "Queenstown (Q)" },
              ],
            },
            {
              name: "Title",
              label: "Title",
              type: "select",
              options: [
                { value: "1", label: "Mr" },
                { value: "2", label: "Miss" },
                { value: "3", label: "Mrs" },
                { value: "4", label: "Master" },
                { value: "5", label: "Rare" },
              ],
            },
            {
              name: "IsAlone",
              label: "Family Status",
              type: "select",
              options: [
                { value: "0", label: "Alone" },
                { value: "1", label: "With Family" },
              ],
            },
          ].map((field) => (
            <div className="col-md-6" key={field.name}>
              <label className="form-label">{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="form-control"
                >
                  {field.options.map((opt) =>
                    typeof opt === "string" ? (
                      <option key={opt} value={opt}>{opt}</option>
                    ) : (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="form-control"
                  placeholder={field.placeholder}
                  step={field.step}
                  min={field.min}
                  max={field.max}
                  required={field.required}
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4 d-flex gap-2">
          <button
            onClick={predictSurvival}
            className={`btn flex-grow-1 ${darkMode ? "btn-outline-light" : "btn-primary"}`}
            disabled={loading || !formData.Age || !formData.Fare}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Predicting...
              </>
            ) : "Predict Survival"}
          </button>
          <button
            onClick={resetForm}
            className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-secondary"}`}
          >
            Reset
          </button>
        </div>

        {prediction && (
          <div className="mt-4">
            <div className={`p-3 rounded ${darkMode ? "bg-dark" : "bg-light"}`}>
              <h5 className="text-center mb-3">Prediction Result</h5>
              <div className="d-flex justify-content-between mb-2">
                <strong>Model:</strong>
                <span>{prediction.model}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <strong>Result:</strong>
                <span className={prediction.survived ? "text-success fw-bold" : "text-danger fw-bold"}>
                  {prediction.survived ? "Survived" : "Did not survive"}
                </span>
              </div>
              {prediction.probability !== null && (
                <>
                  <div className="progress mt-2" style={{ height: "10px" }}>
                    <div
                      className={`progress-bar ${prediction.survived ? "bg-success" : "bg-danger"}`}
                      style={{ width: `${(prediction.probability * 100).toFixed(1)}%` }}
                    />
                  </div>
                  <small className="text-muted">
                    Probability: {(prediction.probability * 100).toFixed(1)}%
                  </small>
                </>
              )}
              {prediction.probability === null && (
                <small className="text-muted">
                  (Probability not available for this model)
                </small>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
    