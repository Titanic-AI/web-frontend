// src/pages/Calculator.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Calculator({ darkMode }) {
  const [formData, setFormData] = useState({
    Pclass: "1",
    Sex: "0",
    Age: "",
    SibSp: "0",
    Parch: "0",
    Fare: "",
    Embarked: "0",
  });

  const [selectedModel, setSelectedModel] = useState("LinearSVM");
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const validators = {
      Pclass: (v) => ["1", "2", "3"].includes(v),
      Sex: (v) => v === "0" || v === "1",
      Age: (v) => parseFloat(v) >= 0.42 && parseFloat(v) <= 80,
      SibSp: (v) => parseInt(v) >= 0 && parseInt(v) <= 8,
      Parch: (v) => parseInt(v) >= 0 && parseInt(v) <= 6,
      Fare: (v) => parseFloat(v) >= 0 && parseFloat(v) <= 512.33,
      Embarked: (v) => ["0", "1", "2"].includes(v),
    };

    if (validators[name] && !validators[name](value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const predictSurvival = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8002/predict/${selectedModel}`, {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Pclass: parseInt(formData.Pclass),
          Sex: parseInt(formData.Sex),
          Age: parseFloat(formData.Age),
          SibSp: parseInt(formData.SibSp),
          Parch: parseInt(formData.Parch),
          Fare: parseFloat(formData.Fare),
          Embarked: parseInt(formData.Embarked),
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setPrediction(result.survived ? 1 : 0);
      } else {
        alert(result.detail || "Prediction failed");
        setPrediction(null);
      }
    } catch (err) {
      alert("Could not connect to backend.");
      setPrediction(null);
    }
    setLoading(false);
  };

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

        {/* Model Selector */}
        <div className="mb-4">
          <label className="form-label">Select ML Model</label>
          <select
            className="form-control"
            value={selectedModel}
            onChange={(e) => setSelectedModel(e.target.value)}
          >
            <option value="LinearSVM">Linear SVM</option>
            <option value="KNN">KNN</option>
            <option value="DecisionTree">Decision Tree</option>
            <option value="RandomForest">Random Forest</option>
            <option value="logistic">Logistic Regression</option>
          </select>
        </div>

        <div className="row g-3">
          {/* Input Fields */}
          {[
            { name: "Pclass", label: "Passenger Class", type: "select", options: ["1", "2", "3"] },
            { name: "Sex", label: "Sex", type: "select", options: [{ value: "0", label: "Male" }, { value: "1", label: "Female" }] },
            { name: "Age", label: "Age", type: "number", placeholder: "0.42 - 80", step: "0.1" },
            { name: "SibSp", label: "Siblings/Spouses Aboard", type: "number", min: 0, max: 8 },
            { name: "Parch", label: "Parents/Children Aboard", type: "number", min: 0, max: 6 },
            { name: "Fare", label: "Fare", type: "number", step: "0.01", placeholder: "0 - 512.33" },
            {
              name: "Embarked",
              label: "Embarked",
              type: "select",
              options: [
                { value: "0", label: "Southampton" },
                { value: "1", label: "Cherbourg" },
                { value: "2", label: "Queenstown" },
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
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-4">
          <button
            onClick={predictSurvival}
            className={`btn w-100 ${darkMode ? "btn-outline-light" : "btn-primary"}`}
            disabled={loading}
          >
            {loading ? "Predicting..." : "Predict Survival"}
          </button>
        </div>

        {prediction !== null && (
          <div className={`mt-4 text-center ${darkMode ? "text-white" : ""}`}>
            Prediction:{" "}
            <span className={prediction === 1 ? "text-success fw-bold" : "text-danger fw-bold"}>
              {prediction === 1 ? "Survived" : "Did not survive"}
            </span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
