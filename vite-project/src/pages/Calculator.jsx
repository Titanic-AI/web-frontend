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
    setFormData((fd) => ({ ...fd, [name]: value }));
  };
  const resetForm = () => {
    setFormData({
      Pclass: "1",
      Sex: "0",
      Age: "",
      Fare: "",
      Embarked: "0",
      Title: "1",
      IsAlone: "0",
    });
    setResults([]);
    setError(null);
  };

  // ─── render ───────────────────────────────────────────────────────────────
  return (
    <div
      className={`min-vh-100 d-flex align-items-center justify-content-center ${
        darkMode ? "text-light" : "text-dark"
      }`}
    >
      <motion.div
        className="rounded-4 shadow-lg p-4 p-md-5"
        style={{
          width: "100%",
          maxWidth: "700px",
          backdropFilter: "blur(12px)",
          backgroundColor: darkMode
            ? "rgba(30, 30, 30, 0.85)"
            : "rgba(255, 255, 255, 0.85)",
          border: darkMode
            ? "1px solid rgba(255, 255, 255, 0.15)"
            : "1px solid rgba(0, 0, 0, 0.1)",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-center mb-4">Titanic Survival Calculator</h2>

        {error && <div className="alert alert-danger mb-3">{error}</div>}

        {/* ── Input fields ────────────────────────────────────────── */}
        <div className="row g-3">
          {/* Pclass */}
          <div className="col-md-6">
            <label className="form-label">Passenger Class</label>
            <select
              name="Pclass"
              className="form-control"
              value={formData.Pclass}
              onChange={handleChange}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
          </div>
          {/* Sex */}
          <div className="col-md-6">
            <label className="form-label">Sex</label>
            <select
              name="Sex"
              className="form-control"
              value={formData.Sex}
              onChange={handleChange}
            >
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
              className="form-control"
              value={formData.Age}
              onChange={handleChange}
              placeholder="0-100"
              min={0}
              max={100}
            />
          </div>
          {/* Fare */}
          <div className="col-md-6">
            <label className="form-label">Fare</label>
            <input
              type="number"
              name="Fare"
              className="form-control"
              value={formData.Fare}
              onChange={handleChange}
              placeholder="0-500"
              step="0.01"
              min={0}
              max={500}
            />
          </div>
          {/* Embarked */}
          <div className="col-md-6">
            <label className="form-label">Embarked</label>
            <select
              name="Embarked"
              className="form-control"
              value={formData.Embarked}
              onChange={handleChange}
            >
              <option value="0">Southampton (S)</option>
              <option value="1">Cherbourg (C)</option>
              <option value="2">Queenstown (Q)</option>
            </select>
          </div>
          {/* Title */}
          <div className="col-md-6">
            <label className="form-label">Title</label>
            <select
              name="Title"
              className="form-control"
              value={formData.Title}
              onChange={handleChange}
            >
              <option value="1">Mr</option>
              <option value="2">Miss</option>
              <option value="3">Mrs</option>
              <option value="4">Master</option>
              <option value="5">Rare</option>
            </select>
          </div>
          {/* IsAlone */}
          <div className="col-md-6">
            <label className="form-label">Family Status</label>
            <select
              name="IsAlone"
              className="form-control"
              value={formData.IsAlone}
              onChange={handleChange}
            >
              <option value="0">Alone</option>
              <option value="1">With Family</option>
            </select>
          </div>
        </div>

        {/* ── Actions ─────────────────────────────────────────────── */}
        <div className="mt-4 d-flex gap-2">
          <button
            onClick={predictSurvival}
            className={`btn flex-grow-1 ${
              darkMode ? "btn-outline-light" : "btn-primary"
            }`}
            disabled={loading}
          >
            {loading ? "Predicting…" : "Predict Survival"}
          </button>
          <button
            onClick={resetForm}
            className={`btn ${
              darkMode ? "btn-outline-light" : "btn-outline-secondary"
            }`}
          >
            Reset
          </button>
        </div>

        {/* ── Side-by-side Results ──────────────────────────────── */}
        {results.length > 0 && ( 
          <div className="mt-4">
            {results.map((r) => (
              <div
                key={r.model}
                className="p-3 mb-3 rounded"
                style={{
                  backdropFilter: "blur(6px)",
                  backgroundColor: darkMode
                    ? "rgba(30,30,30,0.75)"
                    : "rgba(255,255,255,0.75)",
                  border: darkMode
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(0,0,0,0.1)",
                }}
              >
                <h5 className="text-center mb-3">Prediction Result</h5>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Model:</strong>
                  <span>{r.model}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <strong>Result:</strong>
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
                    <div className="progress mt-2" style={{ height: "10px" }}>
                      <div
                        className={`progress-bar ${
                          r.survived ? "bg-success" : "bg-danger"
                        }`}
                        style={{
                          width: `${(r.probability_of_survival * 100).toFixed(
                            1
                          )}%`,
                        }}
                      />
                    </div>
                    <small className="text-muted">
                      Probability:{" "}
                      {(r.probability_of_survival * 100).toFixed(1)}%
                    </small>
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── History Table ─────────────────────────────────────── */}
        {isAuthenticated && history.length > 0 && (
          <div className="mt-5">
            <h5>Last 10 Predictions</h5>
            <table className="table table-sm">
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
                    <td>{h.survived ? "Yes" : "No"}</td>
                    <td>
                      {(h.probability_of_survival * 100).toFixed(1)}%
                    </td>
                    <td>
                      {new Date(h.timestamp).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>
    </div>
  );
}
