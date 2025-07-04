// src/pages/AdminModels.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../api";

export default function AdminModels({ darkMode }) {
  const [models, setModels]     = useState([]);
  const [features, setFeatures] = useState([]);
  const [name, setName]         = useState("");

  useEffect(() => {
    api.get("/admin/models").then((r) => setModels(r.data)); 
    api.get("/admin/features").then((r) => setFeatures(r.data));
  }, []);

  const train = () =>
    api.post("admin/models", { name, features })
       .then((r) => setModels((m) => [...m, r.data]));

  const del = (id) =>
    api.delete(`admin/models/${id}`)
       .then(() => setModels((m) => m.filter((x) => x.id !== id)));

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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Models
        </motion.h2>

        <motion.ul 
          className={`list-group mb-4 ${darkMode ? 'bg-transparent' : ''}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {models.map((m) => (
            <motion.li 
              key={m.id}
              className={`list-group-item d-flex justify-content-between align-items-center 
                ${darkMode ? 'bg-dark text-light border-secondary' : ''}`}
              style={{
                backdropFilter: 'blur(5px)',
                backgroundColor: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.5)'
              }}
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span>{m.name}</span>
              <button 
                className={`btn btn-sm ${darkMode ? 'btn-outline-danger' : 'btn-danger'}`}
                onClick={() => del(m.id)}
              >
                Delete
              </button>
            </motion.li>
          ))}
        </motion.ul>

        <motion.h4
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Train new model
        </motion.h4>

        <motion.input
          className={`form-control mb-3 ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
          placeholder="Model name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            backgroundColor: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
            borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        />

        <motion.select
          multiple
          className={`form-select mb-4 ${darkMode ? 'bg-dark text-white border-secondary' : ''}`}
          onChange={(e) =>
            setFeatures([...e.target.selectedOptions].map((o) => o.value))
          }
          style={{
            backgroundColor: darkMode ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)',
            borderColor: darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)'
          }}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          {features.map((f) => (
            <option 
              key={f}
              className={darkMode ? 'bg-dark text-white' : ''}
            >
              {f}
            </option>
          ))}
        </motion.select>

        <motion.button
          className={`btn ${darkMode ? 'btn-outline-light' : 'btn-primary'}`}
          onClick={train}
          disabled={!name || features.length === 0}
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,255,0.1)'
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Train
        </motion.button>
      </motion.div>
    </div>
  );
}