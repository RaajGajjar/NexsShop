import React from 'react';
import { Box, Typography, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  return (
    <Box component="footer" sx={{ p: 3, bgcolor: 'primary.main', color: 'white', textAlign: 'center', mt: 5 }}>
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Button color="inherit" onClick={() => navigate('/')}>
              Home
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={() => navigate('/about')}>
              About Us
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={() => navigate('/admin/login')}>
              Admin Login
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={() => navigate('/login')}>
              Client Login
            </Button>
          </Grid>
          <Grid item>
            <Button color="inherit" onClick={() => navigate('/contact')}>
              Contact Us
            </Button>
          </Grid>
        </Grid>
        <Typography variant="body1" sx={{ mt: 2 }}>
          © 2024 Nexa Shop. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
