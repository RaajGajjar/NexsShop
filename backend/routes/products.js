const express = require('express');
const { body, param, validationResult } = require('express-validator');
const Product = require('../models/Product');
const auth = require('../middleware/auth');

const router = new express.Router();

// Create a new product
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('description').optional(),
    body('category').notEmpty().withMessage('Category is required'),
    body('stock').isInt({ min: 0 }).withMessage('Stock must be a non-negative integer'),
    body('image_url').optional().isURL().withMessage('Must be a valid URL'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const product = new Product({
      ...req.body,
      createdBy: req.user._id,
    });

    try {
      await product.save();
      res.status(201).send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Get all products
router.get('/', auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const { createdBy } = req.query;

    const isAdmin = req.user.email === 'admin@admin.com';

    if (isAdmin) {
      let filter = {};
      if (createdBy) {
        filter = { createdBy };
      }

      const products = await Product.find(filter).populate('createdBy', 'name');
      return res.send(products);
    }

    const createdById = createdBy ? createdBy : userId;

    const products = await Product.find({ createdBy: createdById }).populate('createdBy', 'name');
    return res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get products for logged-in client
router.get('/mine', auth, async (req, res) => {
  try {
    const products = await Product.find({ createdBy: req.user._id });
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a product by ID
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid product ID'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const _id = req.params.id;
    try {
      const product = await Product.findById(_id);
      if (!product) {
        return res.status(404).send();
      }
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Update a product by ID
router.patch(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid product ID'),
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    body('description').optional(),
    body('category').optional().notEmpty().withMessage('Category is required'),
    body('stock').optional().isInt({ min: 1 }).withMessage('Stock must be a non-negative integer'),
    body('image_url').optional().isURL().withMessage('Must be a valid URL'), 
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'price', 'description', 'category', 'stock', 'image_url'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).send();
      }

      updates.forEach((update) => product[update] = req.body[update]);
      await product.save();
      res.send(product);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Delete a product by ID
router.delete(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid product ID'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).send();
      }
      res.send(product);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

module.exports = router;