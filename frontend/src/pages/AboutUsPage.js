import React from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import teamImage from '../assets/team.jpg'; 
import officeImage from '../assets/office.jpg';
import customersImage from '../assets/customers.jpg';
import Footer from '../components/Footer';
import PublicNavbar from '../components/PublicNavbar';

const AboutUsPage = () => {
  return (
    <>
      <PublicNavbar />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          About Us
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
          Learn more about our team, our office, and our commitment to customer satisfaction.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 5 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Our Team
              </Typography>
              <img src={teamImage} alt="Our Team" style={{ width: '100%', height: 'auto' }} />
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                Our team is composed of dedicated professionals who are passionate about delivering the best products and services to our customers.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Our Office
              </Typography>
              <img src={officeImage} alt="Our Office" style={{ width: '100%', height: 'auto' }} />
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                Our modern office space is designed to foster creativity and collaboration, ensuring that our team can deliver top-notch solutions.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Customer Satisfaction
              </Typography>
              <img src={customersImage} alt="Customer Satisfaction" style={{ width: '100%', height: 'auto' }} />
              <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                We prioritize customer satisfaction and strive to provide the best shopping experience. Our friendly staff is always ready to assist you.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default AboutUsPage;
