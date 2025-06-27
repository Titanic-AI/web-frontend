import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [models, setModels] = useState([]);
  const [modelType, setModelType] = useState("SVM");
  const [selectedFeatures, setSelectedFeatures] = useState([]);

  const allFeatures = ["Pclass", "Sex", "Age", "Fare", "Embarked", "Title", "IsAlone"];

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const res = await axios.get("/api/admin/models", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModels(res.data);
    } catch (err) {
      console.error("Error fetching models", err);
    }
  };

  const deleteModel = async (id) => {
    if (!window.confirm("Delete this model?")) return;
    try {
      await axios.delete(`/api/admin/models/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchModels();
    } catch (err) {
      console.error("Error deleting model", err);
    }
  };

  const trainModel = async () => {
    try {
      await axios.post(
        "/api/admin/train",
        { model_type: modelType, features: selectedFeatures },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchModels();
      alert("Model trained");
    } catch (err) {
      alert("Training failed");
      console.error(err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Model Manager</h1>

      {/* Train Model Form */}
      <div className="border p-4 mb-6 rounded-xl">
        <h2 className="text-xl mb-2">Train New Model</h2>
        <label className="block mb-2">
          Model Type:
          <select
            value={modelType}
            onChange={(e) => setModelType(e.target.value)}
            className="ml-2 border rounded p-1"
          >
            <option>SVM</option>
            <option>RandomForest</option>
            <option>DecisionTree</option>
            <option>KNN</option>
            <option>Logistic</option>
          </select>
        </label>

        <div className="my-2">
          <span className="font-semibold">Select Features:</span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {allFeatures.map((feat) => (
              <label key={feat} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={feat}
                  checked={selectedFeatures.includes(feat)}
                  onChange={(e) => {
                    const f = e.target.value;
                    setSelectedFeatures((prev) =>
                      prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]
                    );
                  }}
                />
                {feat}
              </label>
            ))}
          </div>
        </div>

        <button onClick={trainModel} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Train Model
        </button>
      </div>

      <h2 className="text-xl mb-2">Existing Models</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Model ID</th>
            <th className="border p-2">Model Type</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr key={model.Model_id}>
              <td className="border p-2">{model.Model_id}</td>
              <td className="border p-2">{model.Model_Type}</td>
              <td className="border p-2">
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded"
                  onClick={() => deleteModel(model.Model_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
