// routes/privacyPolicyRoutes.js
const express = require("express");
const router = express.Router();
const PrivacyPolicy = require("../models/PrivacyPolicy");

// Get all sections
router.get("/", async (req, res) => {
  const sections = await PrivacyPolicy.find();
  res.json(sections);
});

// Create a section
router.post("/", async (req, res) => {
  const { title, content } = req.body;
  const newSection = new PrivacyPolicy({ title, content });
  await newSection.save();
  res.status(201).json(newSection);
});

// Update a section
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;
  const updated = await PrivacyPolicy.findByIdAndUpdate(
    req.params.id,
    { title, content },
    { new: true }
  );
  res.json(updated);
});

// Delete a section
router.delete("/:id", async (req, res) => {
  await PrivacyPolicy.findByIdAndDelete(req.params.id);
  res.json({ message: "Section deleted" });
});

module.exports = router;
