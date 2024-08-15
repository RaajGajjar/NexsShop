import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Alert, Grid, Paper } from '@mui/material';
import axios from 'axios';
import Navbar from '../components/Navbar';

const AdminDashboard = () => {
  const [counts, setCounts] = useState({ totalOrders: 0, totalProducts: 0, totalClients: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCounts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/dashboard/counts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCounts(response.data);
      } catch (err) {
        setError('Failed to fetch counts. Please try again.');
      }
    };
    fetchCounts();
  }, []);

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1">
            Admin Dashboard
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Total Products
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {counts.totalProducts}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Total Orders
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {counts.totalOrders}
                  </Typography>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4}>
                <Paper elevation={3} sx={{ p: 3 }}>
                  <Typography variant="h5" gutterBottom>
                    Total Clients
                  </Typography>
                  <Typography variant="h3" gutterBottom>
                    {counts.totalClients}
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default AdminDashboard;
