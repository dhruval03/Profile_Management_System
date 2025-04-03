import useAuthStore from '../store/authStore';
import React, { useState } from 'react';
import { Box, TextField, Checkbox, FormControlLabel, Typography, IconButton, InputAdornment, Avatar } from '@mui/material';
import { Visibility, VisibilityOff, LockOutlined } from '@mui/icons-material';
import CustomButton from '../components/CustomButton';
import AuthCard from '../components/AuthCard';
import SnackbarAlert from '../components/SnackbarAlert';
import { validateLogin } from '../utils/authUtils';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const { login } = useAuthStore();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      const result = validateLogin(email, password);
      setMessage(result.message);
      setSeverity(result.success ? 'success' : 'error');
      setOpen(true);

      if (result.success) {
        login(result.user);
        navigate(result.user.role === 'admin' ? '/admin/dashboard' : '/user-dashboard');
      }

      setLoading(false);
    }, 2000);
  };

  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ 
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      width: '100vw', height: '100vh',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    }}>
      <AuthCard>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: 'linear-gradient(90deg, #5C6BC0 0%, #3949AB 100%)', color: 'white', py: 4 }}>
          <Avatar sx={{ mb: 2, bgcolor: 'white', color: '#3949AB', width: 70, height: 70 }}>
            <LockOutlined fontSize="large" />
          </Avatar>
          <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Welcome Back</Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>Sign in to continue your journey</Typography>
        </Box>

        <Box sx={{ p: { xs: 3, sm: 4 } }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField fullWidth label="Email Address" variant="outlined" margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <TextField fullWidth label="Password" variant="outlined" margin="normal" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)}
              InputProps={{ endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                </InputAdornment>
              )}}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <FormControlLabel control={<Checkbox sx={{ color: '#5C6BC0' }} />} label="Remember me" />
              <Typography variant="body2" sx={{ color: '#5C6BC0', cursor: 'pointer' }}>Forgot password?</Typography>
            </Box>
            <CustomButton type="submit" loading={loading}>Sign In</CustomButton>
          </form>
        </Box>
      </AuthCard>

      <SnackbarAlert open={open} message={message} severity={severity} onClose={handleClose} />
    </Box>
  );
};

export default LoginPage;