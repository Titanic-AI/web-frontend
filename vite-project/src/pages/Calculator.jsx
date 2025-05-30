// src/pages/Calculator.jsx
import React, { useState } from "react";

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
    <div className={`container py-4 ${darkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`} style={{ maxWidth: '36rem' }}>
      <div className={`card ${darkMode ? 'bg-secondary text-white' : ''}`}>
        <div className="card-body p-4">
          <h2 className={`text-center mb-4 ${darkMode ? 'text-white' : ''}`}>Survival Calculator</h2>

          <div className="d-flex flex-column gap-3">
            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Pclass
              </label>
              <input 
                name="Pclass" 
                type="number" 
                value={formData.Pclass} 
                onChange={handleChange} 
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              />
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Name
              </label>
              <input 
                name="Name" 
                value={formData.Name} 
                onChange={handleChange} 
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              />
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Sex
              </label>
              <select 
                name="Sex" 
                value={formData.Sex} 
                onChange={handleChange} 
                className={`form-select ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Age
              </label>
              <input 
                name="Age" 
                type="number" 
                value={formData.Age} 
                onChange={handleChange} 
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              />
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                SibSp
              </label>
              <input 
                name="SibSp" 
                type="number" 
                value={formData.SibSp} 
                onChange={handleChange} 
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              />
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Parch
              </label>
              <input 
                name="Parch" 
                type="number" 
                value={formData.Parch} 
                onChange={handleChange} 
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              />
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Ticket
              </label>
              <input 
                name="Ticket" 
                value={formData.Ticket} 
                onChange={handleChange} 
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              />
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Fare
              </label>
              <input 
                name="Fare" 
                type="number" 
                step="0.01" 
                value={formData.Fare} 
                onChange={handleChange} 
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              />
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Cabin
              </label>
              <input 
                name="Cabin" 
                value={formData.Cabin} 
                onChange={handleChange} 
                className={`form-control ${darkMode ? 'bg-dark text-white border-secondary' : ''}`} 
              />
            </div>

            <div>
              <label className={`form-label ${darkMode ? 'text-white' : ''}`}>
                Embarked
              </label>
              <select 
                name="Embarked" 
                value={formData.Embarked} 
                onChange={handleChange} 
                className={`form-select ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
              >
                <option value="C">Cherbourg</option>
                <option value="Q">Queenstown</option>
                <option value="S">Southampton</option>
              </select>
            </div>

            <div className="mt-2">
              <button 
                type="button" 
                onClick={predictSurvival} 
                className={`btn w-100 ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
              >
                Predict
              </button>
            </div>
          </div>

          {prediction !== null && (
            <div className={`mt-4 text-center ${darkMode ? 'text-white' : ''}`}>
              Prediction:{" "}
              <span className={prediction === 1 ? "text-success fw-bold" : "text-danger fw-bold"}>
                {prediction === 1 ? "Survived" : "Did not survive"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}