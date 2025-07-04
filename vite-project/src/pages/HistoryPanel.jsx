// src/pages/HistoryPanel.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function HistoryPanel({ darkMode }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/history").then((r) => setItems(r.data));
  }, []);

  if (!items.length) return null;

  return (
    <div className="mt-4 container"
      style={{
        backdropFilter: 'blur(8px)',
        backgroundColor: darkMode ? 'rgba(30, 30, 40, 0.7)' : 'rgba(255, 255, 255, 0.7)',
        borderRadius: '0.5rem',
        padding: '1rem',
        border: darkMode ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <h5 style={{ color: darkMode ? '#fff' : '#000' }}>Last 10 predictions</h5>
      <div className="table-responsive">
        <table className={`table table-sm ${darkMode ? 'table-dark' : ''}`}
          style={{
            backdropFilter: 'blur(6px)',
            backgroundColor: darkMode ? 'rgba(40, 40, 50, 0.5)' : 'rgba(245, 245, 245, 0.5)'
          }}
        >
          <thead>
            <tr>
              <th style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>#</th>
              <th style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>Params</th>
              <th style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>Result</th>
            </tr>
          </thead>
          <tbody>
            {items.map((h, i) => (
              <tr key={h.id}>
                <td style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>{i + 1}</td>
                <td style={{ borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }}>{h.params}</td>
                <td style={{ 
                  color: h.result ? (darkMode ? '#0dcaf0' : '#198754') : (darkMode ? '#dc3545' : '#dc3545'),
                  borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }}>
                  {h.result ? "Survived" : "Dead"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}