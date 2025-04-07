const express = require("express");
const router = express.Router();
const ContactForm = require("../models/ContactForm"); // Updated model import

// POST route for submitting contact form data (Create)
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

// GET route for fetching all contact submissions (Read All)
router.get("/", async (req, res) => {
  try {
    const contacts = await ContactForm.find(); // Fetch all contact entries
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contacts", error });
  }
});

// GET route for fetching a single contact submission by ID (Read One)
router.get("/:id", async (req, res) => {
  try {
    const contact = await ContactForm.findById(req.params.id); // Fetch contact by ID
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch contact", error });
  }
});

// PUT route for updating a contact submission (Update)
router.put("/:id", async (req, res) => {
  try {
    const { firstName, lastName, email, number, message } = req.body;

    const updatedContact = await ContactForm.findByIdAndUpdate(
      req.params.id,
      { firstName, lastName, email, number, message },
      { new: true } // Return the updated document
    );

    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res.status(200).json({ message: "Contact updated successfully!", updatedContact });
  } catch (error) {
    res.status(500).json({ message: "Failed to update contact", error });
  }
});

// DELETE route for deleting a contact submission (Delete)
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await ContactForm.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.status(200).json({ message: "Contact deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete contact", error });
  }
});

module.exports = router;
