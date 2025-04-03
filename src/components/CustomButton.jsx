import { Button, CircularProgress } from '@mui/material';

const CustomButton = ({ children, loading, ...props }) => (
  <Button 
    {...props}
    fullWidth 
    sx={{
      mt: 1, 
      mb: 2, 
      py: 1.5,
      borderRadius: 2,
      background: 'linear-gradient(90deg, #5C6BC0 0%, #3949AB 100%)',
      color: 'white',
      '&:hover': {
        background: 'linear-gradient(90deg, #3949AB 0%, #303F9F 100%)',
      },
    }}
    disabled={loading}
  >
    {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : children}
  </Button>
);

export default CustomButton;