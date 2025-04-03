import React, { useState } from "react";
import {
  AppBar, Toolbar, IconButton, Box, TextField, Button,
  Typography, Paper, Grid, Avatar, Divider, Container,
  InputAdornment, FormHelperText, Card, CardContent,
  Drawer, List, ListItem, ListItemIcon, ListItemText
} from "@mui/material";
import {
  Menu, Close, AccountCircle, LocationOn, Phone, Email,
  Interests, Info, Link as LinkIcon, PhotoCamera, Save,
  Add, Delete
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Header from "../../components/layouts/Header";
import AdminSidebar from "../../features/admin/AdminSidebar";

const AddProfile = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    profileImage: "",
    location: "",
    contact: "",
    email: "",
    interest: "",
    information: "",
    socialMedia: [""]
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialMediaChange = (index, value) => {
    const updatedSocialMedia = [...formData.socialMedia];
    updatedSocialMedia[index] = value;
    setFormData((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
  };

  const addSocialMediaField = () => {
    setFormData((prev) => ({ ...prev, socialMedia: [...prev.socialMedia, ""] }));
  };

  const removeSocialMediaField = (index) => {
    const updatedSocialMedia = formData.socialMedia.filter((_, i) => i !== index);
    setFormData((prev) => ({ ...prev, socialMedia: updatedSocialMedia }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profileImage: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Data Submitted:", formData);
    // Add your submission logic here
  };

  const headerHeight = 64;

  // Mobile drawer content
  const drawer = (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 2 }}>
        <IconButton onClick={handleDrawerToggle}>
          <Close />
        </IconButton>
      </Box>
      <AdminSidebar />
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* AppBar */}
      <AppBar position="fixed" elevation={0} sx={{ 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        backgroundColor: "#ffffff", 
        color: "primary.main", 
        borderBottom: "1px solid #E5E7EB" 
      }}>
        <Toolbar>
          <IconButton 
            edge="start" 
            sx={{ display: { md: "none" }, mr: 2, color: "inherit" }} 
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>

      {/* Main content area */}
      <Box sx={{ display: "flex", pt: `${headerHeight}px`, height: `calc(100vh - ${headerHeight}px)` }}>
        {/* Sidebar for desktop */}
        <Box
          component="nav"
          sx={{
            width: { md: 240 },
            flexShrink: { md: 0 },
            display: { xs: "none", md: "block" }
          }}
        >
          <Box
            sx={{
              height: "100%",
              width: 240,
              backgroundColor: "#F9FAFB",
              borderRight: "1px solid #E5E7EB",
              padding: 2,
              overflow: "auto"
            }}
          >
            <AdminSidebar />
          </Box>
        </Box>

        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": { width: 280, boxSizing: "border-box" }
          }}
        >
          {drawer}
        </Drawer>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { xs: "100%", md: `calc(100% - 240px)` },
            overflow: "auto",
            backgroundColor: "#F9FAFB"
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: "#111827" }}>
              Add New Profile
            </Typography>

            <Card elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
              <CardContent sx={{ p: 4 }}>
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    {/* Profile Image Section */}
                    <Grid item xs={12} display="flex" justifyContent="center" mb={2}>
                      <Box sx={{ textAlign: "center" }}>
                        <Avatar
                          src={previewImage}
                          sx={{
                            width: 100,
                            height: 100,
                            mb: 1,
                            border: "2px solid #E5E7EB"
                          }}
                        />
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<PhotoCamera />}
                          size="small"
                        >
                          Upload Photo
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={handleImageChange}
                          />
                        </Button>
                      </Box>
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Basic Information
                        </Typography>
                      </Divider>
                    </Grid>

                    {/* Personal Information */}
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <AccountCircle color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LocationOn color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Contact Number"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Phone color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Email color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Interests"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        variant="outlined"
                        placeholder="e.g., Photography, Hiking, Reading"
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <Interests color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Additional Information"
                        name="information"
                        value={formData.information}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        variant="outlined"
                        placeholder="Tell us more about this profile..."
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ alignSelf: "flex-start", mt: 1.5 }}>
                              <Info color="primary" />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Divider sx={{ mb: 2 }}>
                        <Typography variant="subtitle2" color="text.secondary">
                          Social Media Links
                        </Typography>
                      </Divider>
                    </Grid>

                    {/* Social Media Links */}
                    {formData.socialMedia.map((link, index) => (
                      <Grid item xs={12} key={index} display="flex" alignItems="center">
                        <TextField
                          fullWidth
                          label={`Social Media Link ${index + 1}`}
                          value={link}
                          onChange={(e) => handleSocialMediaChange(index, e.target.value)}
                          variant="outlined"
                          placeholder="https://..."
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LinkIcon color="primary" />
                              </InputAdornment>
                            ),
                          }}
                        />
                        {formData.socialMedia.length > 1 && (
                          <IconButton 
                            color="error" 
                            onClick={() => removeSocialMediaField(index)}
                            sx={{ ml: 1 }}
                          >
                            <Delete />
                          </IconButton>
                        )}
                      </Grid>
                    ))}

                    <Grid item xs={12}>
                      <Button 
                        onClick={addSocialMediaField} 
                        variant="outlined" 
                        startIcon={<Add />}
                        size="small"
                      >
                        Add Another Social Media Link
                      </Button>
                    </Grid>
                  </Grid>

                  {/* Submit Button */}
                  <Box sx={{ mt: 4, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      type="button"
                      variant="outlined"
                      sx={{ mr: 2 }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      startIcon={<Save />}
                    >
                      Save Profile
                    </Button>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};

export default AddProfile;