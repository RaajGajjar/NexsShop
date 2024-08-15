import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import ClientNavbar from '../components/ClientNavbar';

const ProductForm = ({ isEdit }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    description: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit && id) {
      const fetchProduct = async () => {
        const token = localStorage.getItem('token');
        try {
          const response = await axios.get(`/api/products/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setProduct(response.data);
        } catch (err) {
          setError('Failed to fetch product. Please try again.');
        }
      };
      fetchProduct();
    }
  }, [isEdit, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const token = localStorage.getItem('token');
    try {
      if (isEdit) {
        await axios.patch(`/api/products/${id}`, {
          name: product.name,
          price: parseFloat(product.price),
          stock: parseInt(product.stock),
          category: product.category,
          description: product.description,
          image_url: product.image_url,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('/api/products', product, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setSuccess('Product saved successfully');
      navigate('/client/products');
    } catch (err) {
      setError('Failed to save product. Please try again.');
    }
  };

  return (
    <>
      <ClientNavbar />
      <Container maxWidth="sm">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {isEdit ? 'Edit Product' : 'Add New Product'}
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
              value={product.name}
              onChange={handleChange}
            />
            <TextField
              label="Price"
              variant="outlined"
              fullWidth
              margin="normal"
              name="price"
              value={product.price}
              onChange={handleChange}
            />
            <TextField
              label="Category"
              variant="outlined"
              fullWidth
              margin="normal"
              name="category"
              value={product.category}
              onChange={handleChange}
            />
            <TextField
              label="Stock"
              variant="outlined"
              fullWidth
              margin="normal"
              name="stock"
              value={product.stock}
              onChange={handleChange}
            />
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              margin="normal"
              name="description"
              value={product.description}
              onChange={handleChange}
              multiline
              rows={4}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              margin="normal"
              name="image_url"
              value={product.image_url}
              onChange={handleChange}
            />
            <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} type="submit">
              {isEdit ? 'Update Product' : 'Add Product'}
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default ProductForm;
