const express = require("express");
const router = express.Router();
const ContactForm = require("../models/ContactForm"); // Updated model import

// POST route for submitting contact form data

router.post("/", async (req, res) => {
  try {
    const { firstName, lastName, email, number, message } = req.body;

    const newContact = new ContactForm({
      FirstName: firstName,
      LastName: lastName,
      email,
      number,
      message,
    });

    const savedContact = await newContact.save();
    res
      .status(201)
      .json({ message: "Message sent successfully!", savedContact });
  } catch (error) {
    console.error("Error saving contact:", error);
    res
      .status(400)
      .json({ message: "Failed to send the message. Please try again." });
  }
});

// GET route for fetching all contact submissions
router.get("/", async (req, res) => {
  try {
    const contacts = await ContactForm.find(); // Fetch all contact entries
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
});

module.exports = router;
