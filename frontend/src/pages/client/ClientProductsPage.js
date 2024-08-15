import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Button, Box, Alert, TextField } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ClientNavbar from '../../components/ClientNavbar';

const ClientProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/api/products/mine', {
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
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(products.filter((product) => product._id !== id));
      setFilteredProducts(filteredProducts.filter((product) => product._id !== id));
    } catch (err) {
      setError('Failed to delete product. Please try again.');
    }
  };

  return (
    <>
      <ClientNavbar />
      <Container>
        <Box sx={{ mt: 5, display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h4" component="h1">
            My Products
          </Typography>
          <Button variant="contained" color="primary" onClick={() => navigate('/client/products/new')}>
            Add Product
          </Button>
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
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  {product.image_url && (
                    <img src={product.image_url} alt={product.name} style={{ width: '50px', height: '50px' }} />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.price}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/client/products/edit/${product._id}`)}>
                    Edit
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(product._id)} sx={{ mx: 1 }}>
                    Delete
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => navigate(`/client/products/${product._id}`)}>
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

export default ClientProductsPage;
