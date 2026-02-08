import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Dashboard from "./Dashboard";
import ProjectDetails from "./ProjectDetails";
import "./styles.css";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  // If not logged in → show login page
  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <BrowserRouter>
     <div className="navbar">
  Project Management System
  <button
    style={{ float: "right", background: "white", color: "#4f46e5" }}
    onClick={() => {
      localStorage.removeItem("token");
      window.location.reload();
    }}
  >
    Logout
  </button>
</div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/project/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
