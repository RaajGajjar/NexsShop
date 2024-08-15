import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import ClientNavbar from '../../components/ClientNavbar';

const ClientProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: '',
    },
    phone: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/customer/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
      } catch (err) {
        setError('Failed to fetch profile. Please try again.');
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      address: {
        ...prevProfile.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      await axios.patch('/api/customer/me', {
        name: profile.name,
        email: profile.email,
        address: profile.address,
        phone: profile.phone,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Profile updated successfully');
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <Box>
      <ClientNavbar />
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Profile
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={profile.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={profile.email}
              onChange={handleChange}
            />
            <TextField
              label="Street"
              variant="outlined"
              fullWidth
              margin="normal"
              name="street"
              value={profile.address.street}
              onChange={handleAddressChange}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
              name="city"
              value={profile.address.city}
              onChange={handleAddressChange}
            />
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              margin="normal"
              name="state"
              value={profile.address.state}
              onChange={handleAddressChange}
            />
            <TextField
              label="Zip"
              variant="outlined"
              fullWidth
              margin="normal"
              name="zip"
              value={profile.address.zip}
              onChange={handleAddressChange}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
              Update Profile
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ClientProfilePage;
