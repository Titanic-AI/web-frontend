// src/pages/Calculator.jsx
import React, { useState } from "react";
import "../styles/Calculator.css";

export default function Calculator() {
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
    <div className="container">
      <h2 className="title">Survival Calculator</h2>

      <form className="form">
        <label>
          Pclass:
          <input name="Pclass" type="number" value={formData.Pclass} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Name:
          <input name="Name" value={formData.Name} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Sex:
          <select name="Sex" value={formData.Sex} onChange={handleChange} className="input-field">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          Age:
          <input name="Age" type="number" value={formData.Age} onChange={handleChange} className="input-field" />
        </label>

        <label>
          SibSp:
          <input name="SibSp" type="number" value={formData.SibSp} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Parch:
          <input name="Parch" type="number" value={formData.Parch} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Ticket:
          <input name="Ticket" value={formData.Ticket} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Fare:
          <input name="Fare" type="number" step="0.01" value={formData.Fare} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Cabin:
          <input name="Cabin" value={formData.Cabin} onChange={handleChange} className="input-field" />
        </label>

        <label>
          Embarked:
          <select name="Embarked" value={formData.Embarked} onChange={handleChange} className="input-field">
            <option value="C">Cherbourg</option>
            <option value="Q">Queenstown</option>
            <option value="S">Southampton</option>
          </select>
        </label>

        <button type="button" onClick={predictSurvival} className="cta-button">
          Predict
        </button>
      </form>

      {prediction !== null && (
        <div className="result">
          Prediction:{" "}
          <span className={prediction === 1 ? "survived" : "not-survived"}>
            {prediction === 1 ? "Survived" : "Did not survive"}
          </span>
        </div>
      )}
    </div>
  );
}
