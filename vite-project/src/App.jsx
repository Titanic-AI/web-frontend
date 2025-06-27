import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Calculator({ darkMode, isAuthenticated }) {
  // Form state
  const [formData, setFormData] = useState({
    Pclass: "1",
    Sex: "0",
    Age: "",
    Fare: "",
    Embarked: "0",
    Title: "1",
    IsAlone: "0",
  });

  // Model selection
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
  const ANON_MODELS = ["RandomForest", "NaiveBayes"];
  const models = isAuthenticated ? ALL_MODELS : ANON_MODELS;

  // State
  const [results, setResults] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Helper functions
  const catAge = (a) =>
    a <= 16 ? 0 : a <= 32 ? 1 : a <= 48 ? 2 : a <= 64 ? 3 : 4;
  const catFare = (f) =>
    f <= 7.91 ? 0 : f <= 14.454 ? 1 : f <= 31 ? 2 : 3;

  // Input handler with hard clamping
  const handleChange = (e) => {
    const { name, value } = e.target;
    let v = value;
    if (name === "Age") v = Math.min(100, Math.max(0, +v || 0));
    if (name === "Fare") v = Math.min(500, Math.max(0, +v || 0));
    setFormData((f) => ({ ...f, [name]: v.toString() }));
  };

  // Double-check before prediction
  const getClampedInputs = () => {
    return {
      ...formData,
      Age: Math.min(100, Math.max(0, +formData.Age || 0)),
      Fare: Math.min(500, Math.max(0, +formData.Fare || 0)),
    };
  };

  const reset = () => {
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

  // Predict
  const predict = async () => {
    const safeInputs = getClampedInputs();
    if (!safeInputs.Age || !safeInputs.Fare) {
      setError("Enter both Age and Fare");
      return;
    }
    setLoading(true);
    setError(null);

    // Update UI immediately if values were clamped
    if (
      safeInputs.Age.toString() !== formData.Age ||
      safeInputs.Fare.toString() !== formData.Fare
    ) {
      setFormData((f) => ({
        ...f,
        Age: safeInputs.Age.toString(),
        Fare: safeInputs.Fare.toString(),
      }));
    }

    const payload = {
      Pclass: +safeInputs.Pclass,
      Sex: +safeInputs.Sex,
      Age: catAge(+safeInputs.Age),
      Fare: catFare(+safeInputs.Fare),
      Embarked: +safeInputs.Embarked,
      Title: +safeInputs.Title,
      IsAlone: +safeInputs.IsAlone,
    };

    try {
      const token = localStorage.getItem("token");
      const fetches = models.map((m) =>
        fetch(`/predict/${m}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(isAuthenticated && { Authorization: `Bearer ${token}` }),
          },
          body: JSON.stringify(payload),
        }).then((r) => r.json())
      );
      const run = await Promise.all(fetches);
      setResults(run);

      // Add to local history (50 max)
      const ts = new Date().toLocaleString();
      setHistory((h) =>
        [...h, { ts, input: { ...safeInputs }, run }].slice(-50)
      );
    } catch (e) {
      setError(e.message);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-predict on valid change
  useEffect(() => {
    if (formData.Age && formData.Fare) {
      const t = setTimeout(predict, 900);
      return () => clearTimeout(t);
    } else setResults([]);
    // eslint-disable-next-line
  }, [formData, isAuthenticated]);

  // Badge helper
  const badge = (ok) =>
    ok ? (
      <span className="text-success">✔</span>
    ) : (
      <span className="text-danger">✖</span>
    );

  return (
    <div className="d-flex" style={{ height: "100vh", overflow: "hidden" }}>
      {/* Main */}
      <motion.div
        className={`flex-grow-1 overflow-auto p-4 ${
          darkMode ? "bg-dark text-light" : "bg-white text-dark"
        }`}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2>Titanic Survival Calculator</h2>
        {error && <div className="alert alert-danger py-1">{error}</div>}

        {/* Inputs */}
        <div className="row g-2 small">
          {[
            ["Pclass", "select", ["1", "2", "3"]],
            ["Sex", "select", ["0:Male", "1:Female"]],
            [
              "Age",
              "num",
              { min: 0, max: 100, step: 1, placeholder: "0-100", label: "Age" },
            ],
            [
              "Fare",
              "num",
              { min: 0, max: 500, step: 0.01, placeholder: "0-500", label: "Fare" },
            ],
            ["Embarked", "select", ["0:Southampton", "1:Cherbourg", "2:Queenstown"]],
            ["Title", "select", ["1:Mr", "2:Miss", "3:Mrs", "4:Master", "5:Rare"]],
            ["IsAlone", "select", ["0:Alone", "1:WithFamily"]],
          ].map(([k, type, opts]) => (
            <div className="col-6 col-md-3" key={k}>
              <label className="form-label mb-1">{opts?.label || k}</label>
              {type === "num" ? (
                <input
                  name={k}
                  type="number"
                  step={opts?.step || "0.01"}
                  min={opts?.min ?? 0}
                  max={opts?.max ?? (k === "Age" ? 100 : 500)}
                  placeholder={opts?.placeholder || ""}
                  value={formData[k]}
                  onChange={handleChange}
                  className="form-control form-control-sm"
                />
              ) : (
                <select
                  name={k}
                  value={formData[k]}
                  onChange={handleChange}
                  className="form-select form-select-sm"
                >
                  {opts.map((o) => {
                    const [val, label = o] = o.split(":");
                    return (
                      <option key={val} value={val}>
                        {label}
                      </option>
                    );
                  })}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="mt-2">
          <button
            className="btn btn-sm btn-primary me-2"
            disabled={loading}
            onClick={predict}
          >
            {loading ? "…" : "Predict"}
          </button>
          <button className="btn btn-sm btn-secondary" onClick={reset}>
            Reset
          </button>
        </div>

        {/* Results */}
        <div className="d-flex flex-wrap gap-2 mt-3">
          {results.map((r) => (
            <div
              key={r.model}
              className={`border rounded p-1 text-center small ${
                darkMode ? "bg-secondary text-light" : "bg-light"
              }`}
              style={{ minWidth: 90, flex: "0 0 90px" }}
            >
              <div style={{ fontSize: 11, fontWeight: 600 }}>{r.model}</div>
              {badge(r.survived)}
              <div style={{ fontSize: 10 }}>
                {r.probability_of_survival != null &&
                  `${Math.round(r.probability_of_survival * 100)}%`}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* History Sidebar */}
      <div
        className="border-start p-2 small overflow-auto"
        style={{ width: 220 }}
      >
        <button
          className="btn btn-sm btn-outline-primary w-100 mb-2"
          onClick={() => setShowHistory((v) => !v)}
        >
          {showHistory ? "Hide History" : "Show History"}
        </button>

        {showHistory && (
          <>
            {history.length === 0 && (
              <div className="text-muted text-center">No runs yet</div>
            )}

            {history
              .slice()
              .reverse()
              .map(({ ts, run }, idx) => (
                <div key={idx} className="mb-2">
                  <div style={{ fontSize: 10 }} className="text-muted">
                    {ts}
                  </div>
                  {run.map((r) => (
                    <div key={r.model}>
                      {badge(r.survived)} {r.model}{" "}
                      {r.probability_of_survival != null &&
                        `${Math.round(r.probability_of_survival * 100)}%`}
                    </div>
                  ))}
                  <hr className="my-1" />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
