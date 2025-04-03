import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { List, ListItemButton, ListItemIcon, ListItemText, Divider } from "@mui/material";
import { Dashboard, PersonAdd, ManageAccounts, ExitToApp } from "@mui/icons-material";
import useAuthStore from "../../store/authStore";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();

  const isActive = (path) => location.pathname === path;

  return (
    <List>
      <ListItemButton
        onClick={() => navigate("/admin/dashboard")}
        sx={{
          color: isActive("/admin/dashboard") ? "#1E40AF" : "#374151",
          backgroundColor: isActive("/admin/dashboard") ? "#E0E7FF" : "transparent",
          "&:hover": { color: "#1E40AF", backgroundColor: "#E0E7FF" },
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}><Dashboard /></ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton
        onClick={() => navigate("/admin/add-profile")}
        sx={{
          color: isActive("/admin/add-profile") ? "#1E40AF" : "#374151",
          backgroundColor: isActive("/admin/add-profile") ? "#E0E7FF" : "transparent",
          "&:hover": { color: "#1E40AF", backgroundColor: "#E0E7FF" },
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}><PersonAdd /></ListItemIcon>
        <ListItemText primary="Add Profile" />
      </ListItemButton>

      <ListItemButton
        onClick={() => navigate("/admin/manage-profiles")}
        sx={{
          color: isActive("/admin/manage-profiles") ? "#1E40AF" : "#374151",
          backgroundColor: isActive("/admin/manage-profiles") ? "#E0E7FF" : "transparent",
          "&:hover": { color: "#1E40AF", backgroundColor: "#E0E7FF" },
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}><ManageAccounts /></ListItemIcon>
        <ListItemText primary="Manage Profiles" />
      </ListItemButton>

      <Divider sx={{ my: 2 }} />

      <ListItemButton
        onClick={logout}
        sx={{
          color: "#DC2626",
          "&:hover": { color: "#B91C1C", backgroundColor: "#FEE2E2" },
        }}
      >
        <ListItemIcon sx={{ color: "inherit" }}><ExitToApp /></ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItemButton>
    </List>
  );
};

export default AdminSidebar;
