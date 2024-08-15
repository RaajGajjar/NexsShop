const express = require('express');
const router = express.Router();
const ContactMessage = require('../models/ContactMessage');

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newMessage = new ContactMessage({ name, email, message });
    await newMessage.save();
    res.status(200).json({ message: 'Message received successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Failed to save message. Please try again later.' });
  }
});

// Route to fetch all contact messages
router.get('/', async (req, res) => {
  try {
    const messages = await ContactMessage.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages. Please try again later.' });
  }
});

module.exports = router;
