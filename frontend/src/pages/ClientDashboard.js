import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Grid, Paper, Alert, Link } from '@mui/material';
import axios from 'axios';
import ClientNavbar from '../components/ClientNavbar';
import { Link as RouterLink } from 'react-router-dom';

const ClientDashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalOrders: 0,
    totalProducts: 0,
    lowStockProducts: [],
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem('token');
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/clientDashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setDashboardData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box>
      <ClientNavbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Client Dashboard
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Total Orders
              </Typography>
              <Typography variant="h3">{dashboardData.totalOrders}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Total Products
              </Typography>
              <Typography variant="h3">{dashboardData.totalProducts}</Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom>
            Low Stock Products
          </Typography>
          {!isLoading && <>
            {dashboardData.lowStockProducts.length > 0 ? (
              <Alert severity="warning">
                The following products have low stock:
                <ul>
                  {dashboardData.lowStockProducts.map((product) => (
                    <li key={product._id}>
                      <Link
                        component={RouterLink}
                        to={`/client/products/edit/${product._id}`}
                        underline="hover"
                      >
                        {product.name} - {product.stock} in stock
                      </Link>
                    </li>
                  ))}
                </ul>
              </Alert>
            ) : (
              <Alert severity="success">All products are sufficiently stocked.</Alert>
            )}
          </>}
        </Box>
      </Container>
    </Box>
  );
};

export default ClientDashboard;
