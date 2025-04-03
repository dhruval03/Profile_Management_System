import { Snackbar, Alert } from '@mui/material';

const SnackbarAlert = ({ open, message, severity, onClose }) => (
  <Snackbar open={open} autoHideDuration={3000} onClose={onClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <Alert severity={severity} onClose={onClose}>
      {message}
    </Alert>
  </Snackbar>
);

export default SnackbarAlert;
