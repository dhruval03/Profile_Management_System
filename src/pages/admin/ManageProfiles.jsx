import React from "react";
import { Box, Typography, AppBar, Toolbar, IconButton, Drawer } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layouts/Header";
import AdminSidebar from "../../features/admin/AdminSidebar";

const ManageProfiles = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const headerHeight = 64; 

  return (
    <Box sx={{ 
      display: "flex", 
      flexDirection: "column", 
      width: "100vw", 
      height: "100vh",
      margin: 0,
      padding: 0,
      overflow: "hidden"
    }}>
      {/* Header */}
      <AppBar 
        position="fixed" 
        sx={{ 
          width: "100%",
          height: `${headerHeight}px`,
          backgroundColor: "#ffffff", 
          boxShadow: "none", 
          borderBottom: "1px solid #E5E7EB",
          zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar sx={{ height: "100%" }}>
          {/* Hamburger Menu for Mobile */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "#374151" }}
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>

      {/* Main Layout */}
      <Box sx={{ 
        display: "flex", 
        position: "fixed",
        top: `${headerHeight}px`,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: `calc(100vh - ${headerHeight}px)`
      }}>
        {/* Sidebar for Desktop */}
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            width: "18%",
            height: "100%",
            backgroundColor: "#F9FAFB",
            padding: 2,
            boxSizing: "border-box",
            boxShadow: "2px 0 10px rgba(0, 0, 0, 0.1)",
            borderRight: "2px solid #E5E7EB",
            overflow: "auto"
          }}
        >
          <AdminSidebar />
        </Box>

        {/* Main Content */}
        <Box sx={{ 
          width: { xs: "100%", md: "82%" },
          height: "100%",
          overflow: "auto",
          padding: "20px",
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
        }}>
          <Typography variant="h4" sx={{ mb: 2 }}>Manage Profiles</Typography>
          <ManageProfileTable />
        </Box>
      </Box>

      {/* Sidebar Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: "250px",
            backgroundColor: "#F9FAFB",
            position: "fixed",
            top: `${headerHeight}px`,
            height: `calc(100% - ${headerHeight}px)`
          },
        }}
      >
        <Box sx={{ width: "100%", p: 2 }}>
          <IconButton onClick={() => setMobileOpen(false)} sx={{ mb: 2 }}>
            <Close />
          </IconButton>
          <AdminSidebar />
        </Box>
      </Drawer>
    </Box>
  );
};

export default ManageProfiles;