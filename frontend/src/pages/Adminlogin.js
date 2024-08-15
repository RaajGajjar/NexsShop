import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Paper, Alert, Avatar, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    try {
      const endpoint = '/api/admin/login';
      const response = await axios.post(endpoint, { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong. Please try again.');
    }
  };

  return (
    <>
      <Container component="main" maxWidth="sm" sx={{ position: 'relative', zIndex: 2 }}>
        <CssBaseline />
        <Paper elevation={6} sx={{ p: 4, mt: 8, borderRadius: 3, bgcolor: 'rgba(255, 255, 255, 0.85)' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h4" component="h1" gutterBottom align="center">
              Admin Login
            </Typography>
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
              />
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
              >
                Login
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)',
          zIndex: 1,
        }}
      ></Box>
    </>
  );
};

export default AdminLogin;
