import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function ProjectDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  // form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  // fetch tasks
  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/tasks/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line
  }, [id]);

  // create task
  const createTask = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          description,
          deadline,
          project: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Task Created ✅");

      setTitle("");
      setDescription("");
      setDeadline("");

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Error creating task");
    }
  };

  // update status
  const updateStatus = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status: "completed" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Updated ✅");
      fetchTasks();
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert("Update failed ❌");
    }
  };

  return (
    <div className="container">
      {/* 🔙 Back Button */}
      <button onClick={() => navigate("/")}>⬅ Back to Dashboard</button>

      <hr />

      {/* ➕ Add Task */}
      <h2>Add Task</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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

      <button onClick={createTask}>Add Task</button>

      <hr />

      {/* 📋 Task List */}
      <h2>Tasks</h2>

      {tasks.length === 0 && <p>No tasks yet.</p>}

      {tasks.map((t) => (
        <div key={t._id} className="card">
          <h3 style={{ marginBottom: "5px" }}>{t.title}</h3>
<p style={{ color: "#555" }}>{t.description}</p>

          <p
            className={`status ${
              t.status === "completed" ? "completed" : "pending"
            }`}
          >
            Status: {t.status}
          </p>

          {/* hide button if completed */}
          {t.status !== "completed" && (
            <button onClick={() => updateStatus(t._id)}>
              Mark Completed
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ProjectDetails;
