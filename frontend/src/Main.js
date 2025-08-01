import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RoleSelection from "./RoleSelection";
import SuperAdminLogin from "./SuperAdminLogin";
import AdminLogin from "./AdminLogin";
import FacultyLogin from "./FacultyLogin";
import Registration from "./Registration";
import PaperSetterLogin from "./PaperSetterLogin";
import SuperAdminDashboard from "./SuperAdminDashboard";
import AdminDashboard from "./AdminDashboard";
import FacultyDashboard from "./Facultydashboard";
import PaperSetterDashboard from "./Papersetterdashboard";
import ManageUsers from "./ManageUsers";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleSelection />} />
        <Route path="/login/super-admin" element={<SuperAdminLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        <Route path="/login/faculty" element={<FacultyLogin />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login/paper-setter" element={<PaperSetterLogin />} />
        <Route path="/super-admin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/paper-setter-dashboard" element={<PaperSetterDashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
      </Routes>
    </Router>
  );
}

export default App;
