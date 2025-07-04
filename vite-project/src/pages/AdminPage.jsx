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
    <div className={`min-vh-100 d-flex justify-content-center ${darkMode ? "text-light" : "text-dark"}`}>
      <motion.div
        className="container py-5 my-5 rounded-4 shadow-lg"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: darkMode ? "rgba(30,30,30,0.75)" : "rgba(255,255,255,0.75)",
          border: darkMode ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          maxWidth: "900px"
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2 
          className="text-center mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Admin Dashboard
        </motion.h2>

        <div className="mb-4">
          <motion.label 
            className="form-label"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            Model Type
          </motion.label>
          <motion.select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className={`form-select ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
            style={{
              backgroundColor: darkMode ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.7)',
              borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {["SVM","RandomForest","DecisionTree","KNN","Logistic"].map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </motion.select>
        </div>

        <div className="mb-4">
          <motion.label 
            className="form-label"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            Select Features
          </motion.label>
          <motion.div 
            className="d-flex flex-wrap gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {allFeatures.map((feat) => (
              <motion.div 
                key={feat} 
                className="form-check"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
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
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.button
          className={`btn mb-4 ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
          onClick={trainModel}
          disabled={loading || selectedFeatures.length === 0}
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 255, 0.1)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          {loading ? "Training..." : "Train Model"}
        </motion.button>

        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          Existing Models
        </motion.h4>
        
        {models.length === 0 ? (
          <motion.p 
            className={darkMode ? "text-white-50" : "text-muted"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            No models found.
          </motion.p>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <table className={`table ${darkMode ? 'table-dark' : ''}`}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Model Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {models.map((m) => (
                  <tr key={m.Model_id}>
                    <td>{m.Model_id}</td>
                    <td>{m.Model_Type}</td>
                    <td>
                      <button
                        onClick={() => deleteModel(m.Model_id)}
                        className={`btn btn-sm ${darkMode ? 'btn-outline-danger' : 'btn-danger'}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}