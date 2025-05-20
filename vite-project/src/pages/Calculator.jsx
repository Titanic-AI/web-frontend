// src/pages/Calculator.jsx
import React, { useState } from "react";

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const predictSurvival = () => {
    // Simple dummy logic: predict survived if female or child
    const survived = formData.Sex === "female" || Number(formData.Age) < 10;
    setPrediction(survived ? 1 : 0);
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto" }}>
      <h2>Survival Calculator Page</h2>

      <label>Pclass:
        <select name="Pclass" value={formData.Pclass} onChange={handleChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </label>

      <br />

      <label>Name:
        <input name="Name" value={formData.Name} onChange={handleChange} />
      </label>

      <br />

      <label>Sex:
        <select name="Sex" value={formData.Sex} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <br />

      <label>Age:
        <input name="Age" type="number" value={formData.Age} onChange={handleChange} />
      </label>

      <br />

      <label>SibSp:
        <input name="SibSp" type="number" value={formData.SibSp} onChange={handleChange} />
      </label>

      <br />

      <label>Parch:
        <input name="Parch" type="number" value={formData.Parch} onChange={handleChange} />
      </label>

      <br />

      <label>Ticket:
        <input name="Ticket" value={formData.Ticket} onChange={handleChange} />
      </label>

      <br />

      <label>Fare:
        <input name="Fare" type="number" value={formData.Fare} onChange={handleChange} />
      </label>

      <br />

      <label>Cabin:
        <input name="Cabin" value={formData.Cabin} onChange={handleChange} />
      </label>

      <br />

      <label>Embarked:
        <select name="Embarked" value={formData.Embarked} onChange={handleChange}>
          <option value="C">Cherbourg</option>
          <option value="Q">Queenstown</option>
          <option value="S">Southampton</option>
        </select>
      </label>

      <br /><br />

      <button onClick={predictSurvival}>Predict</button>

      {prediction !== null && (
        <div>
          <h3>Prediction: {prediction === 1 ? "Survived" : "Did not survive"}</h3>
        </div>
      )}
    </div>
  );
}
