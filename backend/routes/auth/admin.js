const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../../models/Admin');
const auth = require('../../middleware/auth');

const router = new express.Router();

// Admin registration
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const admin = new Admin(req.body);
    try {
      admin.password = await bcrypt.hash(admin.password, 8);
      const token = jwt.sign({ _id: admin._id.toString() }, process.env.JWT_SECRET);
      admin.tokens = admin.tokens.concat({ token });
      await admin.save();
      res.status(201).send({ admin, token });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Admin login
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
      const admin = await Admin.findOne({ email: req.body.email });
      if (!admin) {
        return res.status(400).send({ error: 'Invalid login credentials' });
      }

      const isMatch = await bcrypt.compare(req.body.password, admin.password);
      if (!isMatch) {
        return res.status(400).send({ error: 'Invalid login credentials' });
      }

      const token = jwt.sign({ _id: admin._id.toString(), userType: 'admin' }, process.env.JWT_SECRET);
      admin.tokens = admin.tokens.concat({ token });
      await admin.save();
      res.send({ admin, token });
    } catch (error) {
      res.status(500).send(error);
    }
  }
);

// Admin logout
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