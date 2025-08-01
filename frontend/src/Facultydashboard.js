import React, { useState } from "react";
import "./dashboard.css";

function FacultyDashboard() {
  const [showResetPopup, setShowResetPopup] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleResetPassword = () => {
    setShowResetPopup(true);
  };

  const confirmReset = () => {
    setShowResetPopup(false);
    setShowResetForm(true);
  };

  const cancelReset = () => {
    setShowResetPopup(false);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("❌ New passwords do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword,
          newPassword,
          username: localStorage.getItem("faculty_username"),
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("✅ Password updated successfully.");
        setShowResetForm(false);
      } else {
        setMessage(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to update password.");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Faculty</h2>
        <a href="#">Dashboard</a>
        <a href="#">View Papers</a>
        <a href="#">Submit Questions</a>
        <a href="#" onClick={handleResetPassword}>Reset Password</a>
        <a href="#">Logout</a>
      </div>

      <div className="dashboard-content">
        <h1>Welcome to Faculty Dashboard</h1>
        <p>This is the Faculty's control panel.</p>

        {showResetPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              <p>Are you sure you want to reset your password?</p>
              <div className="popup-buttons">
                <button className="btn confirm" onClick={confirmReset}>Yes</button>
                <button className="btn cancel" onClick={cancelReset}>No</button>
              </div>
            </div>
          </div>
        )}

        {showResetForm && (
          <div className="reset-form">
            <h3>Reset Password</h3>
            <form onSubmit={handlePasswordUpdate}>
              <div className="input-wrapper">
                <input
                  type={showOld ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowOld(!showOld)} className="toggle-eye">
                  {showOld ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="input-wrapper">
                <input
                  type={showNew ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowNew(!showNew)} className="toggle-eye">
                  {showNew ? "🙈" : "👁️"}
                </span>
              </div>

              <div className="input-wrapper">
                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span onClick={() => setShowConfirm(!showConfirm)} className="toggle-eye">
                  {showConfirm ? "🙈" : "👁️"}
                </span>
              </div>

              <button type="submit" className="btn confirm">Update Password</button>
            </form>
            {message && <p className="msg">{message}</p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default FacultyDashboard;
