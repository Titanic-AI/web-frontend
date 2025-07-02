// src/pages/AdminModels.jsx
import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminModels() {
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
    <div className="container py-4">
      <h2>Models</h2>
      <ul className="list-group mb-4">
        {models.map((m) => (
          <li key={m.id} className="list-group-item d-flex justify-content-between">
            <span>{m.name}</span>
            <button className="btn btn-sm btn-danger" onClick={() => del(m.id)}>Del</button>
          </li>
        ))}
      </ul>

      <h4>Train new model</h4>
      <input
        className="form-control mb-2"
        placeholder="Model name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <select
        multiple
        className="form-select mb-3"
        onChange={(e) =>
          setFeatures([...e.target.selectedOptions].map((o) => o.value))
        }
      >
        {features.map((f) => <option key={f}>{f}</option>)}
      </select>
      <button className="btn btn-primary" onClick={train}>Train</button>
    </div>
  );
}
