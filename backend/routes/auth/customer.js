const express = require('express');
const { body, param, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Customer = require('../../models/Customer');
const auth = require('../../middleware/auth');

const router = new express.Router();

// Create a new customer
router.post(
  '/',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address.street').notEmpty().withMessage('Street is required'),
    body('address.city').notEmpty().withMessage('City is required'),
    body('address.state').notEmpty().withMessage('State is required'),
    body('address.zip').notEmpty().withMessage('Zip is required'),
    body('phone').notEmpty().withMessage('Phone number is required'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const customer = new Customer(req.body);
    try {
      await customer.save();
      res.status(201).send(customer);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Get all customers
router.get('/', auth, async (req, res) => {
  try {
    const customers = await Customer.find({});
    res.send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Customer me
router.get('/me', auth, async (req, res) => {
  res.send(req.user);
});

// Customer PATCH me
router.patch('/me', [
  body('name').optional().notEmpty().withMessage('Name is required'),
  body('email').optional().isEmail().withMessage('Valid email is required'),
  body('address.street').optional().notEmpty().withMessage('Street is required'),
  body('address.city').optional().notEmpty().withMessage('City is required'),
  body('address.state').optional().notEmpty().withMessage('State is required'),
  body('address.zip').optional().notEmpty().withMessage('Zip is required'),
  body('phone').optional().notEmpty().withMessage('Phone number is required'),
],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'address', 'phone'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const customer = await Customer.findById(req.user._id.toString());
      if (!customer) {
        return res.status(404).send();
      }

      updates.forEach((update) => customer[update] = req.body[update]);
      await customer.save();
      res.send(customer);
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  });

// Get a customer by ID
router.get(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid customer ID'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const _id = req.params.id;
    try {
      const customer = await Customer.findById(_id);
      if (!customer) {
        return res.status(404).send();
      }
      res.send(customer);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Admin updates a customer by ID
router.patch(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid customer ID'),
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address.street').optional().notEmpty().withMessage('Street is required'),
    body('address.city').optional().notEmpty().withMessage('City is required'),
    body('address.state').optional().notEmpty().withMessage('State is required'),
    body('address.zip').optional().notEmpty().withMessage('Zip is required'),
    body('phone').optional().notEmpty().withMessage('Phone number is required'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'address', 'phone'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const customer = await Customer.findById(req.params.id);
      if (!customer) {
        return res.status(404).send();
      }

      updates.forEach((update) => customer[update] = req.body[update]);
      await customer.save();
      res.send(customer);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Customer updates their own details
router.patch(
  '/me',
  [
    body('name').optional().notEmpty().withMessage('Name is required'),
    body('email').optional().isEmail().withMessage('Valid email is required'),
    body('password').optional().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('address.street').optional().notEmpty().withMessage('Street is required'),
    body('address.city').optional().notEmpty().withMessage('City is required'),
    body('address.state').optional().notEmpty().withMessage('State is required'),
    body('address.zip').optional().notEmpty().withMessage('Zip is required'),
    body('phone').optional().notEmpty().withMessage('Phone number is required'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'email', 'password', 'address', 'phone'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
      const customer = await Customer.findById(req.user._id);
      if (!customer) {
        return res.status(404).send();
      }

      updates.forEach((update) => customer[update] = req.body[update]);
      await customer.save();
      res.send(customer);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Delete a customer by ID
router.delete(
  '/:id',
  [
    param('id').isMongoId().withMessage('Invalid customer ID'),
  ],
  auth,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const customer = await Customer.findByIdAndDelete(req.params.id);
      if (!customer) {
        return res.status(404).send();
      }
      res.send(customer);
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Customer login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const customer = await Customer.findOne({ email: req.body.email });
      if (!customer) {
        return res.status(400).send({ error: 'Invalid login credentials' });
      }

      const isMatch = await bcrypt.compare(req.body.password, customer.password);
      if (!isMatch) {
        return res.status(400).send({ error: 'Invalid login credentials' });
      }

      const token = jwt.sign({ _id: customer._id.toString(), userType: 'client' }, process.env.JWT_SECRET);
      customer.tokens = customer.tokens.concat({ token });
      await customer.save();
      res.send({ customer, token });
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
);

// Customer logout
router.post('/logout', auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => token.token !== req.token);
    await req.user.save();
    res.send();
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;