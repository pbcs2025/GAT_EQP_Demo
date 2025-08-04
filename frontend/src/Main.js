import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./AdminDashboard";
import FacultyDashboard from "./Facultydashboard";
import PaperSetterDashboard from "./PaperSetterDashboard";
import ManageUsers from "./ManageUsers";
import AdminManageFaculty from "./AdminManageFaculty";
import AdminManageFacultyPage from "./AdminManageFacultyPage";
import QuestionPaperBuilder from "./QuestionPaperBuilder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
        <Route path="/paper-setter-dashboard" element={<PaperSetterDashboard />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-faculty" element={<AdminManageFaculty />} />
        <Route path="/admin/manage-faculty-page" element={<AdminManageFacultyPage />} />
        <Route path="/question-paper-builder" element={<QuestionPaperBuilder />} />
      </Routes>
    </Router>
  );
}

export default App;
