import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Admin Panel
        </Typography>
        <Button color="inherit" onClick={() => navigate('/admin')}>Dashboard</Button>
        <Button color="inherit" onClick={() => navigate('/clients')}>Clients</Button>
        <Button color="inherit" onClick={() => navigate('/products')}>Products</Button>
        <Button color="inherit" onClick={() => navigate('/admin/messages')}>Messages</Button>
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
