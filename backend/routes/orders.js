const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Order = require('../models/Order');
const auth = require('../middleware/auth');

const router = new express.Router();

// Create a new order
router.post(
  '/',
  [
    body('customerName').notEmpty().withMessage('Customer name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.product').isMongoId().withMessage('Invalid product ID'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerName, email, phone, items } = req.body;
    const total = items.reduce((sum, item) => sum + item.subtotal, 0);

    const order = new Order({
      customerName,
      email,
      phone,
      items,
      total,
      createdBy: req.user._id,
    });

    try {
      await order.save();

      // reduce the stock of each product in the order
      for (const item of items) {
        await Order.reduceStock(item.product, item.quantity);
      }


      res.status(201).send(order);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Get all orders for the logged-in client
router.get('/mine', auth, async (req, res) => {
  try {
    const orders = await Order.find({ createdBy: req.user._id }).populate('items.product');
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete an order by ID
router.delete(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid order ID'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const order = await Order.findByIdAndDelete(req.params.id);
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);


// Get an order by ID
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid order ID'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const order = await Order.findById(req.params.id).populate('items.product');
      if (!order) {
        return res.status(404).send();
      }
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// admin route
// Get all orders
router.get('/', auth, async (req, res) => {
  try {
    const { customer } = req.query;
    const orders = await Order.find({ createdBy: customer }).populate('items.product');
    res.send(orders);
  } catch (error) {
    res.status(500).send(error);
  }
});


module.exports = router;
