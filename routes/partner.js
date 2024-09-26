const express = require("express");
const router = express.Router();
const Partner = require("../models/partner");

// Create a new partner
router.post("/partners", async (req, res) => {
  try {
    const partner = new Partner(req.body);
    await partner.save();
    res.status(201).json(partner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all partners
router.get("/partners", async (req, res) => {
  try {
    const partners = await Partner.find();
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single partner by ID
router.get("/partners/:id", async (req, res) => {
  try {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a partner by ID
router.put("/partners/:id", async (req, res) => {
  try {
    const partner = await Partner.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    res.status(200).json(partner);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a partner by ID
router.delete("/partners/:id", async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return res.status(404).json({ error: "Partner not found" });
    }
    res.status(204).json({ message: "Partner deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
