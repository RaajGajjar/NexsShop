import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Alert, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const AdminProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/products', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
        setFilteredProducts(response.data); // Initialize filtered products
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const results = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.createdBy?.name || '').toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  return (
    <>
      <Navbar />
      <Container>
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1">
            Products
          </Typography>
        </Box>
        <Box sx={{ mt: 3, mb: 3 }}>
          <TextField
            label="Search Products"
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
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Uploaded By</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} />
                  ) : (
                    'No Image'
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button variant="text" onClick={() => navigate(`/clients/${product.createdBy?._id}`)}>
                    {product.createdBy?.name || 'Unknown'}
                  </Button>
                </TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/products/${product._id}`)}>
                    View
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

export default AdminProductsPage;
