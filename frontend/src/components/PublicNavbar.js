import { AppBar, Button, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const PublicNavbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/')}>
          Nexa Shop
        </Typography>
        <Button color="inherit" onClick={() => navigate('/')}>
          Home
        </Button>
        <Button color="inherit" onClick={() => navigate('/contact')}>
          Contact Us
        </Button>
        <Button color="inherit" onClick={() => navigate('/about')}>
          About Us
        </Button>
        <Button color="inherit" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default PublicNavbar