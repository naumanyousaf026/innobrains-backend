const express = require('express');
const router = express.Router();
const Stats = require('../models/Stats'); 

// GET all stats (usually just one record)
router.get('/', async (req, res) => {
  try {
    const stats = await Stats.find();
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET stats by ID
router.get('/:id', async (req, res) => {
  try {
    const stats = await Stats.findById(req.params.id);
    if (!stats) {
      return res.status(404).json({ message: 'Stats not found' });
    }
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST create new stats
router.post('/', async (req, res) => {
  const stats = new Stats({
    headline: req.body.headline,
    description: req.body.description,
    loyalClients: req.body.loyalClients,
    experts: req.body.experts,
    yearsExperience: req.body.yearsExperience,
    techAwards: req.body.techAwards
  });

  try {
    const newStats = await stats.save();
    res.status(201).json(newStats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update stats by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedStats = await Stats.findByIdAndUpdate(
      req.params.id,
      {
        loyalClients: req.body.loyalClients,
        experts: req.body.experts,
        yearsExperience: req.body.yearsExperience,
        techAwards: req.body.techAwards
      },
      { new: true }
    );
    
    if (!updatedStats) {
      return res.status(404).json({ message: 'Stats not found' });
    }
    
    res.status(200).json(updatedStats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PATCH update specific fields in stats
router.patch('/:id', async (req, res) => {
  try {
    const updatedStats = await Stats.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    
    if (!updatedStats) {
      return res.status(404).json({ message: 'Stats not found' });
    }
    
    res.status(200).json(updatedStats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE stats by ID
router.delete('/:id', async (req, res) => {
  try {
    const stats = await Stats.findByIdAndDelete(req.params.id);
    
    if (!stats) {
      return res.status(404).json({ message: 'Stats not found' });
    }
    
    res.status(200).json({ message: 'Stats deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;