import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Box, Paper, Grid, Card, CardContent } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminClientDetailsPage = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      const token = localStorage.getItem('token');
      try {
        const clientResponse = await axios.get(`/api/customers/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setClient(clientResponse.data);

        const productsResponse = await axios.get(`/api/products?createdBy=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(productsResponse.data);

        const ordersResponse = await axios.get(`/api/orders?customer=${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(ordersResponse.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchClientDetails();
  }, [id]);

  if (!client) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {client.name}'s Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Contact Information</Typography>
                <Typography variant="body1"><strong>Email:</strong> {client.email}</Typography>
                <Typography variant="body1"><strong>Phone:</strong> {client.phone}</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Products</Typography>
                {products.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Price</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Stock</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product._id}>
                          <TableCell>{product.name}</TableCell>
                          <TableCell>{product.price}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell>{product.stock}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography variant="body2">No products available.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h5" gutterBottom>Orders</Typography>
                {orders.length > 0 ? (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Total</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order._id}>
                          <TableCell>{order._id}</TableCell>
                          <TableCell>${order.total.toFixed(2)}</TableCell>
                          <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <Typography variant="body2">No orders available.</Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AdminClientDetailsPage;
