import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Avatar, Badge, Container, Box } from "@mui/material";
import { Notifications, AccountCircle } from "@mui/icons-material";
import useAuthStore from "../../store/authStore";

const Header = () => {
  const { user } = useAuthStore(); 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ backgroundColor: "#f0f9ff", 
    zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Container maxWidth={false}>
          <Toolbar disableGutters>
            {/* Left Side - Logo (Shifted Right on Mobile) */}
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontWeight: "bold",
                cursor: "pointer",
                background: "linear-gradient(to right, #60a5fa, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontSize: "1.5rem",
                ml: { xs: 4, sm: 6, md: 0 },
              }}
            >
              ProfileVault
            </Typography>

            {/* Right Side - Notification & Profile */}
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* Notifications (Only for Users) */}
              {user?.role === "user" && (
                <IconButton sx={{ mr: 2, color: "#64748b" }}>
                  <Badge variant="dot" color="error">
                    <Notifications />
                  </Badge>
                </IconButton>
              )}

              {/* User Profile */}
              <Box sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "#dbeafe" }}>
                  <AccountCircle sx={{ color: "#60a5fa" }} fontSize="small" />
                </Avatar>
                <Typography variant="body1" sx={{ ml: 1, fontWeight: 500, color: "#64748b" }}>
                  {user?.name || "Guest"}
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Header;
