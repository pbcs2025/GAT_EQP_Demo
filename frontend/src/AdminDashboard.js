import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const handleLogoutClick = () => setShowConfirm(true);
  const confirmLogout = () => {
    setShowConfirm(false);
    navigate("/");
  };
  const cancelLogout = () => setShowConfirm(false);
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin</h2>
        <a href="#">Dashboard</a>
        <a href="#">Manage Faculties</a>
        <a href="#">Reports</a>
        <a href="#" onClick={handleLogoutClick} style={{ color: "red" }}>
          Logout
        </a>
      </div>
      <div className="dashboard-content">
        <h1>Welcome to Admin Dashboard</h1>
        <p>This is the Admin's control panel.</p>
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

export default AdminDashboard;
