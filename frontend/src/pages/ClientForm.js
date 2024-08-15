import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ClientForm = ({ isEdit }) => {
  const { id } = useParams();
  const [client, setClient] = useState({
    name: '',
    email: '',
    password: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    },
    phone: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      const fetchClient = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`/api/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setClient(response.data);
        } catch (err) {
          setError('Failed to fetch client. Please try again.');
        }
      };
      fetchClient();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setClient((prevClient) => ({
      ...prevClient,
      address: {
        ...prevClient.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    try {
      if (isEdit) {
        await axios.patch(`/api/customers/${id}`, {
          name: client.name,
          email: client.email,
          address: client.address,
          phone: client.phone,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/customers', client, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/clients');
    } catch (err) {
      setError(err.response?.data?.errors?.map((error) => error.msg).join(', ') || 'Something went wrong. Please check email and try again.');
    }
  };

  return (
    <Box>
      <Navbar />
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {isEdit ? 'Edit Client' : 'Add New Client'}
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={client.name}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              name="email"
              value={client.email}
              onChange={handleChange}
            />
            {!isEdit && (
              <TextField
                label="Password"
                variant="outlined"
                type="password"
                fullWidth
                margin="normal"
                name="password"
                value={client.password}
                onChange={handleChange}
              />
            )}
            <TextField
              label="Street"
              variant="outlined"
              fullWidth
              margin="normal"
              name="street"
              value={client.address.street}
              onChange={handleAddressChange}
            />
            <TextField
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
              name="city"
              value={client.address.city}
              onChange={handleAddressChange}
            />
            <TextField
              label="State"
              variant="outlined"
              fullWidth
              margin="normal"
              name="state"
              value={client.address.state}
              onChange={handleAddressChange}
            />
            <TextField
              label="Zip"
              variant="outlined"
              fullWidth
              margin="normal"
              name="zip"
              value={client.address.zip}
              onChange={handleAddressChange}
            />
            <TextField
              label="Phone"
              variant="outlined"
              fullWidth
              margin="normal"
              name="phone"
              value={client.phone}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
              {isEdit ? 'Update Client' : 'Add Client'}
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ClientForm;
