// src/pages/HistoryPanel.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function HistoryPanel() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    api.get("/history").then((r) => setItems(r.data));
  }, []);

  if (!items.length) return null;

  return (
    <div className="mt-4 container">
      <h5>Last 10 predictions</h5>
      <table className="table table-sm">
        <thead>
          <tr><th>#</th><th>Params</th><th>Result</th></tr>
        </thead>
        <tbody>
          {items.map((h, i) => (
            <tr key={h.id}>
              <td>{i + 1}</td>
              <td>{h.params}</td>
              <td>{h.result ? "Survived" : "Dead"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
