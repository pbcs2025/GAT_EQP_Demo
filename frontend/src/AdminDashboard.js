import React from "react";
import "./dashboard.css";

function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin</h2>
        <a href="#">Dashboard</a>
        <a href="#">Manage Faculties</a>
        <a href="#">Reports</a>
        <a href="#">Logout</a>
      </div>
      <div className="dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>This is the Admin's control panel.</p>
      </div>
    </div>
  );
}

export default AdminDashboard;
