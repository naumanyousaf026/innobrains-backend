// routes/companyValues.js

const express = require('express');
const router = express.Router();
const CompanyValues = require('../models/CompanyValues'); // Import the model

// Create new company values
router.post('/', async (req, res) => {
  const { headline, sections } = req.body;

  try {
    const newCompanyValues = new CompanyValues({
      headline,
      sections
    });

    const savedValues = await newCompanyValues.save();
    res.status(201).json(savedValues); // Return the newly created company values
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get company values (Read)
router.get('/', async (req, res) => {
  try {
    const values = await CompanyValues.findOne(); // You can modify this to find multiple entries if needed

    if (!values) {
      return res.status(404).json({ message: 'Company values not found' });
    }

    res.json(values);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single company values by ID (optional)
router.get('/:id', async (req, res) => {
  try {
    const values = await CompanyValues.findById(req.params.id);

    if (!values) {
      return res.status(404).json({ message: 'Company values not found' });
    }

    res.json(values);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update company values (Update)
router.put('/company-values/:id', async (req, res) => {
  try {
    const updatedValues = await CompanyValues.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedValues) {
      return res.status(404).json({ message: 'Company values not found' });
    }

    res.json(updatedValues);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete company values (Delete)
router.delete('/:id', async (req, res) => {
  try {
    const deletedValues = await CompanyValues.findByIdAndDelete(req.params.id);

    if (!deletedValues) {
      return res.status(404).json({ message: 'Company values not found' });
    }

    res.json({ message: 'Company values deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
