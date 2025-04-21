const express = require("express");
const router = express.Router();
const PrivacyPolicy = require("../models/PrivacyPolicy");

// Get the privacy policy
router.get("/", async (req, res) => {
  const policy = await PrivacyPolicy.findOne();
  res.json(policy);
});

// Create or Replace the whole privacy policy
router.post("/", async (req, res) => {
  const { sections } = req.body;

  // Remove old and insert new
  await PrivacyPolicy.deleteMany({});
  const newPolicy = new PrivacyPolicy({ sections });
  await newPolicy.save();

  res.status(201).json(newPolicy);
});
