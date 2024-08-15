const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

const router = new express.Router();

// Get dashboard counts
router.get('/counts', auth, async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalClients = await Customer.countDocuments();

    res.send({ totalOrders, totalProducts, totalClients });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
