import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper, Alert, Button, Grid, Card, CardContent, CardMedia } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
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
  }, [id]);

  if (error) {
    return (
      <>
        <Navbar />
        <Container>
          <Alert severity="error">{error}</Alert>
        </Container>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
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
      <Navbar />
      <Container maxWidth="md">
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Product Details
          </Typography>
          <Card sx={{ display: 'flex', mb: 3 }}>
            {product.image_url && (
              <CardMedia
                component="img"
                sx={{ width: 200 }}
                image={product.image_url}
                alt={product.name}
              />
            )}
            <CardContent sx={{ flex: 1 }}>
              <Typography variant="h5" gutterBottom>{product.name}</Typography>
              <Typography variant="h6" color="text.secondary" gutterBottom>Price: ${product.price.toFixed(2)}</Typography>
              <Typography variant="body1" color="text.secondary">Category: {product.category}</Typography>
              <Typography variant="body1" color="text.secondary">Stock: {product.stock}</Typography>
              <Typography variant="body1" color="text.secondary">Description: {product.description}</Typography>
            </CardContent>
          </Card>
          <Button variant="contained" color="primary" onClick={() => navigate('/products')}>
            Back to Products
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default ProductDetailsPage;
