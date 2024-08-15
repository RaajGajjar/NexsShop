import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Alert, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClientNavbar from '../../components/ClientNavbar';
import { generateInvoicePDF } from '../../utils/pdfGenerator';

const ClientOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/orders/mine', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
        setFilteredOrders(response.data);
      } catch (err) {
        setError('Failed to fetch orders. Please try again.');
      }
    };
    fetchOrders();
  }, []);

  useEffect(() => {
    const results = orders.filter(order =>
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredOrders(results);
  }, [searchQuery, orders]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(orders.filter((order) => order._id !== id));
      setFilteredOrders(filteredOrders.filter((order) => order._id !== id));
    } catch (err) {
      setError('Failed to delete order. Please try again.');
    }
  };

  const handleView = async (id) => {
    navigate(`/client/orders/${id}`);
  };

  const handleGeneratePDF = (order) => {
    generateInvoicePDF(order);
  };

  return (
    <>
      <ClientNavbar />
      <Container>
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1">
            My Orders
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/client/orders/new')}>
            Create Order
          </Button>
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <TextField
            label="Search Orders"
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
              <TableCell>Order ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="contained" color="secondary" onClick={() => handleView(order._id)} sx={{ ml: 1 }}>
                    View
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(order._id)} sx={{ ml: 1 }}>
                    Delete
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => handleGeneratePDF(order)} sx={{ ml: 1 }}>
                    Generate PDF
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

export default ClientOrdersPage;
