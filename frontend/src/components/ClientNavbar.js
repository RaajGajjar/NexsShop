import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ClientNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Client Panel
        </Typography>
        <Button color="inherit" onClick={() => navigate('/client/dashboard')}>Dashboard</Button>
        <Button color="inherit" onClick={() => navigate('/client/products')}>Products</Button>
        <Button color="inherit" onClick={() => navigate('/client/orders')}>Orders</Button>
        <Button color="inherit" onClick={() => navigate('/client/profile')}>Profile</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default ClientNavbar;
