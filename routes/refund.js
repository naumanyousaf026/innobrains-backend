const express = require("express");
const router = express.Router();
const RefundSection = require("../models/RefundSection");

// GET all refund policies (should return one document ideally)
router.get("/", async (req, res) => {
  try {
    const sections = await RefundSection.find().sort("createdAt");
    res.json(sections);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a new refund policy
router.post("/", async (req, res) => {
  const { sectionId, title, description, items } = req.body;

  if (!sectionId || !title) {
    return res.status(400).json({ error: "sectionId and title are required" });
  }

  try {
    const newPolicy = new RefundSection({
      sectionId,
      title,
      description,
      items, // items: [ { heading, description, points } ]
    });

    await newPolicy.save();
    res.status(201).json(newPolicy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT - Update full policy by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPolicy = await RefundSection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedPolicy);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE - Delete policy by ID
router.delete("/:id", async (req, res) => {
  try {
    await RefundSection.findByIdAndDelete(req.params.id);
    res.json({ message: "Policy deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
