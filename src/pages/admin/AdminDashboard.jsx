import React, { useState } from "react";
import { Avatar, Paper, TableContainer, Table, Box, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography, AppBar, Toolbar, IconButton, Card, CardContent, Grid, TextField, MenuItem, Select, InputLabel, FormControl, Drawer } from "@mui/material";
import { Menu, Close, Delete } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/layouts/Header";
import useAuthStore from "../../store/authStore";
import AdminSidebar from "../../features/admin/AdminSidebar";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ManageProfile from "../../pages/admin/ManageProfiles";

const totalProfiles = 120; 
const totalUsers = 45;
const filterOptions = ["All", "Active", "Inactive"];

// Added status field to profiles data
const profiles = [
  { id: 1, name: "John Doe", image: "/profile1.jpg", contact: "john@example.com", location: "New York", status: "Active" },
  { id: 2, name: "Jane Smith", image: "/profile2.jpg", contact: "jane@example.com", location: "Los Angeles", status: "Active" },
  { id: 3, name: "Michael Brown", image: "/profile3.jpg", contact: "michael@example.com", location: "Chicago", status: "Inactive" },
  { id: 4, name: "Emily Davis", image: "/profile4.jpg", contact: "emily@example.com", location: "Houston", status: "Active" },
  { id: 5, name: "Robert Wilson", image: "/profile5.jpg", contact: "robert@example.com", location: "Miami", status: "Inactive" },
  { id: 6, name: "Sarah Johnson", image: "/profile6.jpg", contact: "sarah@example.com", location: "Boston", status: "Active" },
  { id: 7, name: "David Lee", image: "/profile7.jpg", contact: "david@example.com", location: "Seattle", status: "Active" },
  { id: 8, name: "Lisa Taylor", image: "/profile8.jpg", contact: "lisa@example.com", location: "Denver", status: "Inactive" },
  { id: 9, name: "James Martin", image: "/profile9.jpg", contact: "james@example.com", location: "Atlanta", status: "Active" },
  { id: 10, name: "Jennifer Garcia", image: "/profile10.jpg", contact: "jennifer@example.com", location: "Phoenix", status: "Active" },
];

const AdminDashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState("dashboard");
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuthStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");

  // Set full screen coverage
  React.useEffect(() => {
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.margin = 0;
    document.documentElement.style.padding = 0;
    document.documentElement.style.height = '100%';
    document.documentElement.style.width = '100%';

    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
      document.body.style.overflow = '';
      document.documentElement.style.margin = '';
      document.documentElement.style.padding = '';
      document.documentElement.style.height = '';
      document.documentElement.style.width = '';
    };
  }, []);

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle delete profile
  const handleDeleteProfile = (id) => {
    console.log(`Delete profile with ID: ${id}`);
    // Add your delete logic here
  };

  // Filter profiles based on search term and filter status
  const getFilteredProfiles = () => {
    return profiles.filter(profile => {
      // First apply search term filter
      const matchesSearch = 
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.contact.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Then apply status filter
      const matchesStatus = 
        filter === "All" || 
        profile.status === filter;
      
      // Return true only if both conditions are met
      return matchesSearch && matchesStatus;
    });
  };

  // Get filtered profiles
  const filteredProfiles = getFilteredProfiles();

  // Reset to first page when filters change
  React.useEffect(() => {
    setPage(0);
  }, [searchTerm, filter]);

  const renderContent = () => {
    return (
      <Box>
        {/* Dashboard Cards */}
        {selectedComponent === "manageProfile" && <ManageProfile />}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {/* Profiles Card */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2, backgroundColor: "#E3F2FD" }}>
              <PersonIcon sx={{ fontSize: 50, color: "#1976D2", mr: 2 }} />
              <CardContent>
                <Typography variant="h6">Total Profiles</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>{totalProfiles}</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Users Card */}
          <Grid item xs={12} sm={6}>
            <Card sx={{ display: "flex", alignItems: "center", p: 2, backgroundColor: "#E8F5E9" }}>
              <GroupIcon sx={{ fontSize: 50, color: "#2E7D32", mr: 2 }} />
              <CardContent>
                <Typography variant="h6">Total Users</Typography>
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>{totalUsers}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Search Bar & Filter Dropdown (Full Width Row) */}
        <Box sx={{ display: "flex", gap: 2, width: "100%", mb: 3 }}>
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            label="Search Profiles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, email, or location"
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "8px"
            }}
          />

          {/* Filter Dropdown */}
          <FormControl sx={{ minWidth: 220 }}>
            <InputLabel>Filter Status</InputLabel>
            <Select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#FFFFFF",
                borderRadius: "8px",
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1E40AF", // Blue hover effect
                },
              }}
            >
              {filterOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Profile List with Pagination */}
        <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="profiles table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F9FAFB' }}>ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F9FAFB' }}>Profile</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F9FAFB' }}>Contact Details</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F9FAFB' }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F9FAFB' }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#F9FAFB' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredProfiles.length > 0 ? (
                  filteredProfiles
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((profile) => (
                      <TableRow hover key={profile.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell component="th" scope="row">
                          {profile.id}
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar 
                              src={profile.image} 
                              alt={profile.name}
                              sx={{ mr: 2, width: 40, height: 40 }}
                            />
                            <Typography variant="body1">{profile.name}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>{profile.contact}</TableCell>
                        <TableCell>{profile.location}</TableCell>
                        <TableCell>
                          <Box 
                            sx={{ 
                              backgroundColor: profile.status === 'Active' ? '#E8F5E9' : '#FEECEC',
                              color: profile.status === 'Active' ? '#2E7D32' : '#D32F2F',
                              borderRadius: '4px',
                              padding: '4px 8px',
                              display: 'inline-block',
                              fontWeight: 'medium',
                              fontSize: '0.875rem'
                            }}
                          >
                            {profile.status}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <IconButton 
                            color="error" 
                            onClick={() => handleDeleteProfile(profile.id)}
                            sx={{ 
                              '&:hover': { 
                                backgroundColor: '#FEECEC',
                              }
                            }}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                      <Typography variant="body1" color="text.secondary">
                        No profiles found matching your search criteria
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredProfiles.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    );
  };


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
          {/* Hamburger Menu (Only visible on mobile) */}
          <IconButton
            sx={{ display: { xs: "block", md: "none" }, color: "#374151" }}
            onClick={() => setMobileOpen(true)}
          >
            <Menu />
          </IconButton>
          <Header />
        </Toolbar>
      </AppBar>

      {/* Main Container - Covers entire area below header */}
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
          <AdminSidebar setSelectedComponent={setSelectedComponent} />
        </Box>

        {/* Main Content Area */}
        <Box sx={{
          width: { xs: "100%", md: "82%" },
          height: "100%",
          overflow: "auto",
          padding: "20px",
          boxSizing: "border-box",
          backgroundColor: "#FFFFFF",
        }}>
          {renderContent()}
        </Box>
      </Box>

      {/* Sidebar Drawer for Mobile */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true,
        }}
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
          {/* Close Button */}
          <IconButton onClick={() => setMobileOpen(false)} sx={{ mb: 2 }}>
            <Close />
          </IconButton>
          <AdminSidebar setSelectedComponent={setSelectedComponent} />
        </Box>
      </Drawer>
    </Box>
  );
};

export default AdminDashboard;