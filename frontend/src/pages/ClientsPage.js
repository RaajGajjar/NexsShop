import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Alert, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClients = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/customers', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClients(response.data);
        setFilteredClients(response.data); // Initialize filtered clients
      } catch (err) {
        setError('Failed to fetch clients. Please try again.');
      }
    };
    fetchClients();
  }, []);

  useEffect(() => {
    const results = clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredClients(results);
  }, [searchQuery, clients]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/customers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setClients(clients.filter((client) => client._id !== id));
      setFilteredClients(filteredClients.filter((client) => client._id !== id));
    } catch (err) {
      setError('Failed to delete client. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1">
            Clients
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/clients/new')}>
            Add Client
          </Button>
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <TextField
            label="Search Clients"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Box>
        {error && <Alert severity="error">{error}</Alert>}
        <Table sx={{ mt: 2 }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client._id}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.email}</TableCell>
                <TableCell>{client.phone}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/clients/${client._id}`)}>
                    View
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => navigate(`/clients/edit/${client._id}`)} sx={{ ml: 1 }}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(client._id)} sx={{ ml: 1 }}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container>
    </>
  );
};

export default ClientsPage;
