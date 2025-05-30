// src/pages/Calculator.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function Calculator({ darkMode }) {
  const [formData, setFormData] = useState({
    Pclass: "1",
    Name: "",
    Sex: "male",
    Age: "",
    SibSp: "0",
    Parch: "0",
    Ticket: "",
    Fare: "",
    Cabin: "",
    Embarked: "S",
  });

  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const rules = {
      Pclass: (val) => parseInt(val) >= 1 && parseInt(val) <= 999,
      Age: (val) => parseInt(val) >= 0 && parseInt(val) <= 90,
      SibSp: (val) => parseInt(val) >= 0 && parseInt(val) <= 8,
      Parch: (val) => parseInt(val) >= 0 && parseInt(val) <= 6,
      Fare: (val) => parseFloat(val) >= 0 && parseFloat(val) <= 550,
      Sex: (val) => val === "male" || val === "female",
    };

    if (rules[name] && !rules[name](value)) return;

    setFormData({ ...formData, [name]: value });
  };

  const predictSurvival = async () => {
    const survived = formData.Sex === "female" || Number(formData.Age) < 10;
    setPrediction(survived ? 1 : 0);
  };

  return (
    <div className={`min-vh-100 d-flex align-items-center justify-content-center ${darkMode ? 'text-light' : 'text-dark'}`}>
      <motion.div
        className="rounded-4 shadow-lg p-4 p-md-5"
        style={{
          width: '100%',
          maxWidth: '600px',
          backdropFilter: 'blur(12px)',
          backgroundColor: darkMode ? 'rgba(30, 30, 30, 0.85)' : 'rgba(255, 255, 255, 0.85)',
          border: darkMode ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid rgba(0, 0, 0, 0.1)',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h2 
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Survival Calculator
        </motion.h2>

        <div className="row g-3">
          {[
            { name: 'Pclass', type: 'number', label: 'Passenger Class' },
            { name: 'Name', type: 'text', label: 'Name' },
            { name: 'Sex', type: 'select', label: 'Sex', options: ['male', 'female'] },
            { name: 'Age', type: 'number', label: 'Age' },
            { name: 'SibSp', type: 'number', label: 'Siblings/Spouses' },
            { name: 'Parch', type: 'number', label: 'Parents/Children' },
            { name: 'Ticket', type: 'text', label: 'Ticket Number' },
            { name: 'Fare', type: 'number', label: 'Fare', step: '0.01' },
            { name: 'Cabin', type: 'text', label: 'Cabin' },
            { name: 'Embarked', type: 'select', label: 'Embarked', options: [
              { value: 'C', label: 'Cherbourg' },
              { value: 'Q', label: 'Queenstown' },
              { value: 'S', label: 'Southampton' }
            ]},
          ].map((field, index) => (
            <motion.div 
              className="col-md-6"
              key={field.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.05) }}
            >
              <label className="form-label">{field.label}</label>
              {field.type === 'select' ? (
                <select
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    color: darkMode ? 'white' : 'black'
                  }}
                >
                  {field.options.map(opt => (
                    typeof opt === 'string' ? (
                      <option key={opt} value={opt}>
                        {opt.charAt(0).toUpperCase() + opt.slice(1)}
                      </option>
                    ) : (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    )
                  ))}
                </select>
              ) : (
                <input
                  name={field.name}
                  type={field.type}
                  step={field.step}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="form-control"
                  style={{
                    backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
                    color: darkMode ? 'white' : 'black'
                  }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <button 
            type="button" 
            onClick={predictSurvival} 
            className={`btn w-100 ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
            style={{
              backdropFilter: 'blur(10px)',
              backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 255, 0.1)'
            }}
          >
            Predict Survival
          </button>
        </motion.div>

        {prediction !== null && (
          <motion.div
            className={`mt-4 text-center ${darkMode ? 'text-white' : ''}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            Prediction:{" "}
            <span className={prediction === 1 ? "text-success fw-bold" : "text-danger fw-bold"}>
              {prediction === 1 ? "Survived" : "Did not survive"}
            </span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}