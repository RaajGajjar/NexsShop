// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import models
const Customer = require('./models/Customer');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Admin = require('./models/Admin');

// Import routes
const adminAuthRoutes = require('./routes/auth/admin');
const customerAuthRoutes = require('./routes/auth/customer');
const customerRoutes = require('./routes/customers');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const dashboardRoutes = require('./routes/dashboard');
const contactRoutes = require('./routes/contact');
const clientDashboardRoutes = require('./routes/clientDashboard');

app.use('/api/admin', adminAuthRoutes);
app.use('/api/customer', customerAuthRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/clientDashboard', clientDashboardRoutes);

// Basic route
app.get('/', (req, res) => {
  res.send('Nexa Shop API');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
