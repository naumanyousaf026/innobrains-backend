const express = require("express");
const ContactUs = require("../models/contactUs");
const router = express.Router();

// Create a new contact request
router.post("/contactUs", async (req, res) => {
  try {
    const contactUs = new ContactUs(req.body);
    await contactUs.save();
    res.status(201).json(contactUs);
  } catch (err) {
    res.status(400).json({ error: "Failed to create contact request" });
  }
});

// Get all contact requests
router.get("/contactUs", async (req, res) => {
  try {
    const contactUs = await ContactUs.find();
    res.status(200).json(contactUs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact request data" });
  }
});

// Get a single contact request by ID
router.get("/contactUs/:id", async (req, res) => {
  try {
    const contactUs = await ContactUs.findById(req.params.id);
    if (!contactUs) {
      return res.status(404).json({ error: "Contact request not found" });
    }
    res.status(200).json(contactUs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch contact request data" });
  }
});

// Update a contact request by ID
router.put("/contactUs/:id", async (req, res) => {
  try {
    const contactUs = await ContactUs.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!contactUs) {
      return res.status(404).json({ error: "Contact request not found" });
    }
    res.status(200).json(contactUs);
  } catch (err) {
    res.status(400).json({ error: "Failed to update contact request" });
  }
});

// Delete a contact request by ID
router.delete("/contactUs/:id", async (req, res) => {
  try {
    const contactUs = await ContactUs.findByIdAndDelete(req.params.id);
    if (!contactUs) {
      return res.status(404).json({ error: "Contact request not found" });
    }
    res.status(204).json({ message: "Contact request deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete contact request" });
  }
});

module.exports = router;
