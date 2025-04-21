const express = require("express");
const router = express.Router();
const RefundSection = require("../models/RefundSection");

// Get all sections
router.get("/", async (req, res) => {
  try {
    const sections = await RefundSection.find().sort("createdAt");
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new section
router.post("/", async (req, res) => {
    const { sectionId, title, description, items } = req.body;
  
    if (!sectionId || !title) {
      return res.status(400).json({ error: "sectionId and title are required" });
    }
  
    try {
      const newSection = new RefundSection({ sectionId, title, description, items });
      await newSection.save();
      res.status(201).json(newSection);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

// Update an existing section
router.put("/:id", async (req, res) => {
  try {
    const updated = await RefundSection.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a section
router.delete("/:id", async (req, res) => {
  try {
    await RefundSection.findByIdAndDelete(req.params.id);
    res.json({ message: "Section deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
