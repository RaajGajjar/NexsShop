const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  const clientId = req.user.id;

  try {
    const totalOrders = await Order.countDocuments({ createdBy: clientId });
    const totalProducts = await Product.countDocuments({ createdBy: clientId });
    const lowStockProducts = await Product.find({ createdBy: clientId, stock: { $lt: 5 } });

    res.status(200).json({
      totalOrders,
      totalProducts,
      lowStockProducts,
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard data. Please try again later.' });
  }
});

module.exports = router;
