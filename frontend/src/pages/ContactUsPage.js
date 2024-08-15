import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, Paper, AppBar, Toolbar, Alert } from '@mui/material';
import axios from 'axios';
import Footer from '../components/Footer';
import PublicNavbar from '../components/PublicNavbar';

const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/contact', formData);
      setSuccessMessage(response.data.message);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('There was an error sending the message!', error);
    }
  };

  return (
    <>
      <PublicNavbar />
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Contact Us
        </Typography>
        <Typography variant="h6" gutterBottom align="center">
          We would love to hear from you! Please fill out the form below to get in touch with us.
        </Typography>
        <Grid container spacing={4} sx={{ mt: 5 }}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Contact Form
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Name"
                  name="name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Email"
                  name="email"
                  variant="outlined"
                  type="email"
                  fullWidth
                  margin="normal"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <TextField
                  label="Message"
                  name="message"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  multiline
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                  Send Message
                </Button>
              </form>
              {successMessage && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {successMessage}
                </Alert>
              )}
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Contact Information
              </Typography>
              <Typography variant="body1" gutterBottom>
                Address: 123 Nexa Shop Lane, Business City, BC 12345
              </Typography>
              <Typography variant="body1" gutterBottom>
                Email: support@nexashop.com
              </Typography>
              <Typography variant="body1" gutterBottom>
                Phone: (123) 456-7890
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default ContactUsPage;
