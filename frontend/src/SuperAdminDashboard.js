import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import ManageUsers from "./ManageUsers";

function SuperAdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showConfirm, setShowConfirm] = useState(false);
  const notifications = [
    "📢 New faculty registered.",
    "⚠️ Password update request pending.",
    "✅ Report generated successfully.",
  ];

  const handleLogoutClick = () => setShowConfirm(true);
  const confirmLogout = () => {
    setShowConfirm(false);
    navigate("/");
  };
  const cancelLogout = () => setShowConfirm(false);

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Super Admin</h2>
        <a
          href="#"
          className={activeTab === "dashboard" ? "active-tab" : ""}
          onClick={() => setActiveTab("dashboard")}
        >
          Dashboard
        </a>
        <a
          href="#"
          className={activeTab === "manageUsers" ? "active-tab" : ""}
          onClick={() => setActiveTab("manageUsers")}
        >
          Manage Users
        </a>
        <a
          href="#"
          className={activeTab === "settings" ? "active-tab" : ""}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </a>
        <a href="#" onClick={handleLogoutClick} style={{ color: "red" }}>
          Logout
        </a>
      </div>

      <div className="dashboard-content">
        {activeTab === "dashboard" && (
          <>
            <h1>Welcome to Super Admin Dashboard</h1>

            <div className="dashboard-stats">
              <div className="card">Total Users: 150</div>
              <div className="card">Admins: 10</div>
              <div className="card">Faculties: 85</div>
              <div className="card">Paper Setters: 55</div>
            </div>

            <div className="section recent-activity">
              <h3>Recent Activity</h3>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Activity</th>
                    <th>Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Ravi</td>
                    <td>Faculty</td>
                    <td>Logged in</td>
                    <td>5 mins ago</td>
                  </tr>
                  <tr>
                    <td>Shreya</td>
                    <td>Admin</td>
                    <td>Updated user</td>
                    <td>10 mins ago</td>
                  </tr>
                  <tr>
                    <td>Anil</td>
                    <td>Paper Setter</td>
                    <td>Logged out</td>
                    <td>20 mins ago</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="section notifications">
              <h3>Notifications <span className="badge">{notifications.length}</span></h3>
              <ul>
                {notifications.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        {activeTab === "manageUsers" && <ManageUsers />}

        {activeTab === "settings" && (
          <div>
            <h1>Settings</h1>
            <p>Settings section coming soon...</p>
          </div>
        )}
      </div>

      {showConfirm && (
        <div className="logout-confirm-popup">
          <div className="popup-box">
            <p>Are you sure you want to logout?</p>
            <div className="button-group">
              <button className="yes" onClick={confirmLogout}>Yes</button>
              <button className="no" onClick={cancelLogout}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SuperAdminDashboard;
