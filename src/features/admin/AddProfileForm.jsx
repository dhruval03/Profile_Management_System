import { Box, TextField, Button } from "@mui/material";

const AddProfileForm = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField label="Name" variant="outlined" fullWidth />
      <TextField label="Email" variant="outlined" fullWidth />
      <TextField label="Phone" variant="outlined" fullWidth />
      <Button variant="contained" color="primary">Add Profile</Button>
    </Box>
  );
};

export default AddProfileForm;
