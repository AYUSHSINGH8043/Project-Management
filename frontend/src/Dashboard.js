import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProjects(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const createProject = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/projects",
        { name, description, deadline },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Project Created ✅");

      setName("");
      setDescription("");
      setDeadline("");

      fetchProjects();
    } catch (error) {
      console.log(error);
      alert("Error creating project");
    }
  };

  return (
    <div className="container">
      {/* Create Project */}
      <h2>Create Project</h2>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <br /><br />

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <br /><br />

        <button onClick={createProject}>Add Project</button>
      </div>

      {/* Project List */}
      <h2>Your Projects</h2>

      {projects.map((p) => (
        <div key={p._id} className="card">
          {/* ✅ clickable title */}
          <h3
            style={{ cursor: "pointer", color: "#4f46e5" }}
            onClick={() => navigate(`/project/${p._id}`)}
          >
            {p.name}
          </h3>

          <p style={{ color: "#555" }}>{p.description}</p>

          {/* progress bar */}
          <div style={{ marginTop: "10px" }}>
            <div
              style={{
                height: "8px",
                background: "#e5e7eb",
                borderRadius: "5px",
              }}
            >
              <div
                style={{
                  width: `${p.progress}%`,
                  height: "8px",
                  background: "#4f46e5",
                  borderRadius: "5px",
                }}
              />
            </div>
            <small>{p.progress}% completed</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
