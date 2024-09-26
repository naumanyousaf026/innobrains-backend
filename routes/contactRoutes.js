const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// POST route for submitting contact form data
router.post("/", async (req, res) => {
  console.log(req.body); // Log incoming data
  try {
    const { FirstName, LastName, email, number, message } = req.body;

    // Create a new contact entry
    const newContact = new Contact({
      FirstName,
      LastName,
      email,
      number,
      message,
    });

    // Save the contact entry to the database
    const savedContact = await newContact.save();
    res.status(201).json(savedContact); // Return the saved contact data
  } catch (error) {
    console.error("Error saving contact:", error); // Log the error
    res.status(400).json({ message: "Failed to save contact", error });
  }
});

// GET route for fetching all contact submissions (optional)
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find(); // Fetch all contact entries
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
});

module.exports = router;
