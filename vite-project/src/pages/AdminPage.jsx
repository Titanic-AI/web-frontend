// src/pages/AdminPage.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";

export default function AdminDashboard({ darkMode }) {
  const [models, setModels]             = useState([]);
  const [modelType, setModelType]       = useState("SVM");
  const [selectedFeatures, setSelected] = useState([]);
  const [loading, setLoading]           = useState(false);

  const allFeatures = ["Pclass","Sex","Age","Fare","Embarked","Title","IsAlone"];

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await api.get("/admin/models");
      setModels(res.data);
    } catch (err) {
      console.error("Error fetching models", err);
    }
  };

  const deleteModel = async (id) => {
    if (!window.confirm("Delete this model?")) return;
    try {
      await api.delete(`/admin/models/${id}`);
      fetchModels();
    } catch (err) {
      console.error("Error deleting model", err);
    }
  };

  const trainModel = async () => {
    if (!selectedFeatures.length) return;
    setLoading(true);
    try {
      await api.post("/admin/train", {
        model_type: modelType,
        features: selectedFeatures,
      });
      fetchModels();
    } catch {
      alert("Training failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-vh-100 d-flex justify-content-center ${darkMode ? "text-light":"text-dark"}`}>
      <motion.div
        className="container py-5 my-5 rounded-4 shadow-lg"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: darkMode ? "rgba(30,30,30,0.75)" : "rgba(255,255,255,0.75)",
          border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          maxWidth: "900px"
        }}
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.8 }}
      >
        <h2 className="text-center mb-4">Admin Dashboard</h2>

        <div className="mb-4">
          <label className="form-label">Model Type</label>
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="form-select"
          >
            {["SVM","RandomForest","DecisionTree","KNN","Logistic"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="form-label">Select Features</label>
          <div className="d-flex flex-wrap gap-2">
            {allFeatures.map((feat) => (
              <div key={feat} className="form-check">
                <input
                  id={feat}
                  type="checkbox"
                  className="form-check-input"
                  checked={selectedFeatures.includes(feat)}
                  onChange={(e) =>
                    setSelected((p) =>
                      e.target.checked
                        ? [...p, feat]
                        : p.filter((x) => x !== feat)
                    )
                  }
                />
                <label htmlFor={feat} className="form-check-label">
                  {feat}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button
          className={`btn ${darkMode ? "btn-outline-info":"btn-primary"} mb-4`}
          onClick={trainModel}
          disabled={loading || selectedFeatures.length===0}
        >
          {loading?"Training...":"Train Model"}
        </button>

        <h4>Existing Models</h4>
        {models.length===0 ? (
          <p className="text-muted">No models found.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr><th>ID</th><th>Model Type</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {models.map((m) => (
                <tr key={m.Model_id}>
                  <td>{m.Model_id}</td>
                  <td>{m.Model_Type}</td>
                  <td>
                    <button
                      onClick={() => deleteModel(m.Model_id)}
                      className="btn btn-sm btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </motion.div>
    </div>
  );
}
