import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert, MenuItem, Select, FormControl, InputLabel, Grid, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import axios from 'axios';
import ClientNavbar from '../components/ClientNavbar';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const PUBLIC_KEY = 'Ak-ra1r7-vDzFIccL';
const PRIVATE_KEY = 'AlwSughmS5uYMnM1NcfFf';

const OrderForm = () => {
  const [order, setOrder] = useState({
    customerName: '',
    email: '',
    phone: '',
    items: [],
  });
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder((prevOrder) => ({
      ...prevOrder,
      [name]: value,
    }));
  };

  const handleAddItem = () => {
    const product = products.find((p) => p._id === selectedProduct);

    // check if product is already in cart
    const existingItem = order.items.find((item) => item.product === product._id);

    // check product stock
    if (product.stock < (+quantity + (existingItem ? +existingItem.quantity : 0))) {
      setError('Not enough stock');
      return;
    }

    const subtotal = product.price * quantity;
    setOrder((prevOrder) => ({
      ...prevOrder,
      items: [
        ...prevOrder.items,
        {
          product: product._id,
          name: product.name,
          quantity,
          subtotal,
          image_url: product.image_url,
        },
      ],
    }));

    // clear error
    setError('');
  };

  const sendEmail = async (order) => {
    emailjs.send('service_5q2die5', 'template_i2qfatq', {
      to_name: order.customerName,
      to_email: order.email,
      from_name: 'Nexa Shop',
      message: `
        Your order has been placed successfully for the following items:
        ${order.items.map((item) => `${item.name} x ${item.quantity}`).join('\n')}
        Total: $${order.items.reduce((sum, item) => sum + item.subtotal, 0).toFixed(2)}
      `,
    }, {
      publicKey: PUBLIC_KEY,
    })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    const total = order.items.reduce((sum, item) => sum + item.subtotal, 0);
    try {
      await axios.post('/api/orders', { ...order, total }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSuccess('Order placed successfully');
      // send emails      
      sendEmail(order);
      navigate('/client/orders');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <ClientNavbar />
      <Container maxWidth="md">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Order
          </Typography>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}
          <Grid container mt={2} spacing={3}>
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 2 }}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Product</InputLabel>
                  <Select
                    value={selectedProduct}
                    onChange={(e) => setSelectedProduct(e.target.value)}
                  >
                    {products.map((product) => (
                      <MenuItem key={product._id} value={product._id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <TextField
                  label="Quantity"
                  variant="outlined"
                  type="number"
                  fullWidth
                  margin="normal"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleAddItem}>
                  Add to Cart
                </Button>
                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6">Cart</Typography>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Product</TableCell>
                        <TableCell>Quantity</TableCell>
                        <TableCell>Subtotal</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.items.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {item.image_url && (
                              <img src={item.image_url} alt={item.name} style={{ width: '50px', height: '50px' }} />
                            )}
                          </TableCell>
                          <TableCell>{item.name}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>${item.subtotal.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Customer Details</Typography>
                <TextField
                  label="Customer Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="customerName"
                  value={order.customerName}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="email"
                  value={order.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Phone"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="phone"
                  value={order.phone}
                  onChange={handleChange}
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit" onClick={handleSubmit}>
                  Place Order
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default OrderForm;
