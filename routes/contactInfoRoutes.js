const express = require("express");
const router = express.Router();
const ContactInfo = require("../models/ContactInfo");

// GET contact info
router.get("/", async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findOne();
    if (!contactInfo) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new contact info (Create)
router.post("/", async (req, res) => {
  const { email, location, phone, hours } = req.body;

  const contactInfo = new ContactInfo({
    email,
    location,
    phone,
    hours,
  });

  try {
    const newContactInfo = await contactInfo.save();
    res.status(201).json(newContactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT contact info (Update)
router.put("/:id", async (req, res) => {
  try {
    const updatedContactInfo = await ContactInfo.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedContactInfo) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json(updatedContactInfo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE contact info
router.delete("/:id", async (req, res) => {
  try {
    const contactInfo = await ContactInfo.findByIdAndDelete(req.params.id);
    if (!contactInfo) {
      return res.status(404).json({ message: "Contact information not found" });
    }
    res.json({ message: "Contact information deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
