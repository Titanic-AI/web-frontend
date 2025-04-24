import React, { useState, useEffect } from 'react';

export default function Calculator() {
  const [form, setForm] = useState({
    classType: '',
    sex: '',
    age: '',
    fare: '',
    traveledAlone: '',
    embarked: '',
    title: '',
    selectedModels: [],
  });

  const [predictions, setPredictions] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 🔐 Replace with real auth logic

  const modelOptions = ['Random Forest', 'Support Vector Machine'];

  useEffect(() => {
    if (form.sex && form.age && form.classType) {
      // Dummy prediction logic for demo
      const result = (form.sex === 'Female' && parseInt(form.age) < 40) ? 'Survived' : 'Did not survive';
      let newPredictions = {};
      (form.selectedModels.length > 0 ? form.selectedModels : ['Random Forest']).forEach(model => {
        newPredictions[model] = result;
      });
      setPredictions(newPredictions);
    }
  }, [form]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleModelChange = (e) => {
    const { value, checked } = e.target;
    setForm(prev => ({
      ...prev,
      selectedModels: checked
        ? [...prev.selectedModels, value]
        : prev.selectedModels.filter(m => m !== value),
    }));
  };

  const resetForm = () => {
    setForm({
      classType: '',
      sex: '',
      age: '',
      fare: '',
      traveledAlone: '',
      embarked: '',
      title: '',
      selectedModels: [],
    });
    setPredictions({});
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Survival Calculator</h2>

      <div>
        <label>Class: (Ticket Class: 1 = Upper, 2 = Middle, 3 = Lower)</label>
        <select name="classType" value={form.classType} onChange={handleChange}>
          <option value="">Select</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
        </select>
      </div>

      <div>
        <label>Sex:</label>
        <select name="sex" value={form.sex} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>

      <div>
        <label>Age: (Passenger Age)</label>
        <input
          type="number"
          name="age"
          value={form.age}
          onChange={handleChange}
          min="0"
          max="100"
        />
      </div>

      <div>
        <label>Fare: (Ticket Price)</label>
        <input
          type="number"
          name="fare"
          value={form.fare}
          onChange={handleChange}
          min="0"
          max="500"
        />
      </div>

      <div>
        <label>Traveled Alone: (Was the passenger alone?)</label>
        <select name="traveledAlone" value={form.traveledAlone} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>
      </div>

      <div>
        <label>Embarked: (Boarded from)</label>
        <select name="embarked" value={form.embarked} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Cherbourg">Cherbourg</option>
          <option value="Queenstown">Queenstown</option>
          <option value="Southampton">Southampton</option>
        </select>
      </div>

      <div>
        <label>Title: (Passenger's Title)</label>
        <select name="title" value={form.title} onChange={handleChange}>
          <option value="">Select</option>
          <option value="Master">Master</option>
          <option value="Miss">Miss</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Rare">Rare</option>
        </select>
      </div>

      <div>
        <label>Model Selection:</label>
        {modelOptions.map((model) => (
          <div key={model}>
            <input
              type={isLoggedIn ? "checkbox" : "radio"}
              name="model"
              value={model}
              checked={form.selectedModels.includes(model)}
              onChange={handleModelChange}
            />
            <label>{model}</label>
          </div>
        ))}
      </div>

      <button onClick={resetForm} style={{ marginTop: '10px' }}>Reset</button>

      <div style={{ marginTop: '20px' }}>
        <h3>Prediction Results:</h3>
        {Object.keys(predictions).length === 0 ? (
          <p>Fill out the form to see prediction results.</p>
        ) : (
          Object.entries(predictions).map(([model, result]) => (
            <p key={model}><strong>{model}:</strong> {result}</p>
          ))
        )}
      </div>
    </div>
  );
}
