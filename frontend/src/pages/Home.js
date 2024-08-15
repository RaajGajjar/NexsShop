import React from 'react';
import { Container, Typography, Box, Button, Grid, Paper, Fade, Slide, Toolbar, AppBar, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import productImage from '../assets/product.webp';
import orderImage from '../assets/order.webp';
import customerImage from '../assets/customer.webp';
import Footer from '../components/Footer';
import PublicNavbar from '../components/PublicNavbar';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <PublicNavbar />
      <Container maxWidth="lg">
        <Box sx={{ mt: 5, mb: 5 }}>
          <Fade in={true} timeout={1000}>
            <Typography variant="h3" component="h1" gutterBottom align="center">
              Welcome to Nexa Shop
            </Typography>
          </Fade>
          <Fade in={true} timeout={2000}>
            <Typography variant="h6" gutterBottom align="center">
              Your all-in-one Point of Sale (POS) system to manage customers, products, and inventory efficiently.
            </Typography>
          </Fade>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Slide direction="up" in={true} timeout={1000}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Product Management
                </Typography>
                <img src={productImage} alt="Product Management" style={{ width: '100%', height: 'auto' }} />
                <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                  Add, edit, and manage your products with ease. Keep track of your inventory in real-time.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/client/products')}>
                  Manage Products
                </Button>
              </Paper>
            </Slide>
          </Grid>
          <Grid item xs={12} md={4}>
            <Slide direction="up" in={true} timeout={1500}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Order Management
                </Typography>
                <img src={orderImage} alt="Order Management" style={{ width: '100%', height: 'auto' }} />
                <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                  Create and manage customer orders. Generate invoices and keep track of sales.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/client/orders')}>
                  Manage Orders
                </Button>
              </Paper>
            </Slide>
          </Grid>
          <Grid item xs={12} md={4}>
            <Slide direction="up" in={true} timeout={2000}>
              <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                  Customer Management
                </Typography>
                <img src={customerImage} alt="Customer Management" style={{ width: '100%', height: 'auto' }} />
                <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                  Keep track of your customers, their orders, and their contact information.
                </Typography>
                <Button variant="contained" color="primary" onClick={() => navigate('/client/orders')}>
                  Manage Customers
                </Button>
              </Paper>
            </Slide>
          </Grid>
        </Grid>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" gutterBottom align="center">
            Why Choose Nexa Shop?
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={true} timeout={1500}>
                <div>
                  <Typography variant="h6" gutterBottom>
                    Easy to Use
                  </Typography>
                  <Typography variant="body1">
                    Nexa Shop is designed with simplicity in mind. Manage your business effortlessly with our user-friendly interface.
                  </Typography>
                </div>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="right" in={true} timeout={1500}>
                <div>
                  <Typography variant="h6" gutterBottom>
                    Feature-Rich
                  </Typography>
                  <Typography variant="body1">
                    From product management to order processing and customer tracking, Nexa Shop offers all the features you need to run your business efficiently.
                  </Typography>
                </div>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="left" in={true} timeout={2000}>
                <div>
                  <Typography variant="h6" gutterBottom>
                    Secure
                  </Typography>
                  <Typography variant="body1">
                    Your data is safe with us. Nexa Shop uses the latest security measures to protect your information.
                  </Typography>
                </div>
              </Slide>
            </Grid>
            <Grid item xs={12} md={6}>
              <Slide direction="right" in={true} timeout={2000}>
                <div>
                  <Typography variant="h6" gutterBottom>
                    Reliable Support
                  </Typography>
                  <Typography variant="body1">
                    Our support team is here to help you. Get assistance whenever you need it with our reliable customer support.
                  </Typography>
                </div>
              </Slide>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ mt: 5, mb: 5, textAlign: 'center' }}>
          <Fade in={true} timeout={2500}>
            <Button variant="contained" color="secondary" onClick={() => navigate('/login')}>
              Get Started
            </Button>
          </Fade>
        </Box>
      </Container>
      <Footer />
    </div>
  )
}

export default Home;