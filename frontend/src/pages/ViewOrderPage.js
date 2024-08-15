import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, Paper, Alert } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ClientNavbar from '../components/ClientNavbar';

const ViewOrderPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/api/orders/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(response.data);
      } catch (err) {
        setError('Failed to fetch order. Please try again.');
      }
    };
    fetchOrder();
  }, [id]);

  if (error) {
    return (
      <>
        <ClientNavbar />
        <Container>
          <Alert severity="error">{error}</Alert>
        </Container>
      </>
    );
  }

  if (!order) {
    return (
      <>
        <ClientNavbar />
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            Loading...
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <ClientNavbar />
      <Container maxWidth="md">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Order Details
          </Typography>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6">Customer Details</Typography>
            <Typography>Name: {order.customerName}</Typography>
            <Typography>Email: {order.email}</Typography>
            <Typography>Phone: {order.phone}</Typography>
          </Paper>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Order Items</Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.product.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.subtotal.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Typography variant="h6">Total: ${order.total.toFixed(2)}</Typography>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
};

export default ViewOrderPage;
