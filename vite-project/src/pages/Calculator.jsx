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

  const [prediction, setPrediction] = useState(null);

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
    // Replace this mock with actual backend call if needed
    const survived = formData.Sex === "1" || Number(formData.Age) < 10;
    setPrediction(survived ? 1 : 0);
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

        <div className="row g-3">
          {/* Pclass */}
          <div className="col-md-6">
            <label className="form-label">Passenger Class</label>
            <select name="Pclass" value={formData.Pclass} onChange={handleChange} className="form-control">
              <option value="1">1 (Upper)</option>
              <option value="2">2 (Middle)</option>
              <option value="3">3 (Lower)</option>
            </select>
          </div>

          {/* Sex */}
          <div className="col-md-6">
            <label className="form-label">Sex</label>
            <select name="Sex" value={formData.Sex} onChange={handleChange} className="form-control">
              <option value="0">Male</option>
              <option value="1">Female</option>
            </select>
          </div>

          {/* Age */}
          <div className="col-md-6">
            <label className="form-label">Age</label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              step="0.1"
              onChange={handleChange}
              className="form-control"
              placeholder="0.42 - 80"
            />
          </div>

          {/* Siblings/Spouses */}
          <div className="col-md-6">
            <label className="form-label">Siblings/Spouses Aboard</label>
            <input
              type="number"
              name="SibSp"
              value={formData.SibSp}
              onChange={handleChange}
              className="form-control"
              min="0"
              max="8"
            />
          </div>

          {/* Parents/Children */}
          <div className="col-md-6">
            <label className="form-label">Parents/Children Aboard</label>
            <input
              type="number"
              name="Parch"
              value={formData.Parch}
              onChange={handleChange}
              className="form-control"
              min="0"
              max="6"
            />
          </div>

          {/* Fare */}
          <div className="col-md-6">
            <label className="form-label">Fare</label>
            <input
              type="number"
              name="Fare"
              value={formData.Fare}
              step="0.01"
              onChange={handleChange}
              className="form-control"
              placeholder="0 - 512.33"
            />
          </div>

          {/* Embarked */}
          <div className="col-md-12">
            <label className="form-label">Embarked</label>
            <select name="Embarked" value={formData.Embarked} onChange={handleChange} className="form-control">
              <option value="0">Southampton</option>
              <option value="1">Cherbourg</option>
              <option value="2">Queenstown</option>
            </select>
          </div>
        </div>

        <div className="mt-4">
          <button
            onClick={predictSurvival}
            className={`btn w-100 ${darkMode ? "btn-outline-light" : "btn-primary"}`}
          >
            Predict Survival
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
