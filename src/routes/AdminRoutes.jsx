import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AddProfile from "../pages/admin/AddProfile";
import ManageProfiles from "../pages/admin/ManageProfiles";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Correct relative paths */}
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="add-profile" element={<AddProfile />} />
      <Route path="manage-profiles" element={<ManageProfiles />} />

      {/* Redirect unknown routes inside /admin to dashboard */}
      <Route path="*" element={<AdminDashboard />} />
    </Routes>
  );
};

export default AdminRoutes;
