const express = require("express");
const router = express.Router();
const PrivacyPolicy = require("../models/PrivacyPolicy");

// GET: Fetch the privacy policy
router.get("/", async (req, res) => {
  try {
    const policy = await PrivacyPolicy.findOne();
    if (!policy) {
      return res.status(404).json({ message: "Privacy policy not found." });
    }
    res.json(policy);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// POST: Create or replace the privacy policy
router.post("/", async (req, res) => {
  try {
    const { sections } = req.body;

    if (!sections || !Array.isArray(sections)) {
      return res.status(400).json({ message: "Invalid 'sections' format." });
    }

    // Remove existing policy and insert new one
    await PrivacyPolicy.deleteMany({});
    const newPolicy = new PrivacyPolicy({ sections });
    await newPolicy.save();

    res.status(201).json(newPolicy);
  } catch (error) {
    res.status(500).json({ message: "Failed to update privacy policy", error });
  }
});

module.exports = router; 
