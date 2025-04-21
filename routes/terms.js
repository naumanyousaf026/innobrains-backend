const express = require("express");
const router = express.Router();
const TermsSection = require("../models/TermsSection");

// Get all terms
router.get("/", async (req, res) => {
  try {
    const terms = await TermsSection.find().sort("createdAt");
    res.json(terms);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new term
router.post("/", async (req, res) => {
  try {
    const { title, intro, sections } = req.body;
    const newTerms = new TermsSection({ title, intro, sections });
    await newTerms.save();
    res.status(201).json(newTerms);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a term
router.put("/:id", async (req, res) => {
  try {
    const { title, intro, sections } = req.body;
    const updatedTerm = await TermsSection.findByIdAndUpdate(req.params.id, { title, intro, sections }, { new: true });
    res.json(updatedTerm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a term
router.delete("/:id", async (req, res) => {
  try {
    await TermsSection.findByIdAndDelete(req.params.id);
    res.json({ message: "Term deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
