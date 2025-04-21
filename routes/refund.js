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

// Create a section
router.post("/", async (req, res) => {
  try {
    const { title, content } = req.body;
    const newSection = new RefundSection({ title, content });
    await newSection.save();
    res.status(201).json(newSection);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a section
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
