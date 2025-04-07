const express = require('express');
const AboutUs = require('../models/AboutUs');
const router = express.Router();

// GET all About Us content
router.get('/', async (req, res) => {
  try {
    const aboutUs = await AboutUs.find();
    res.json(aboutUs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new About Us content (for admin)
router.post('/', async (req, res) => {
  const { title, description, aboutTitle, aboutDescription } = req.body;
  const newAboutUs = new AboutUs({
    title,
    description,
    aboutTitle,
    aboutDescription,
  });
  
  try {
    const savedAboutUs = await newAboutUs.save();
    res.status(201).json(savedAboutUs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
