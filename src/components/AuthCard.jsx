import { Paper } from '@mui/material';

const AuthCard = ({ children }) => (
  <Paper elevation={12} sx={{ 
    width: '100%', 
    maxWidth: '450px',
    borderRadius: 4,
    overflow: 'hidden',
    margin: { xs: 2, sm: 3 }
  }}>
    {children}
  </Paper>
);

export default AuthCard;
