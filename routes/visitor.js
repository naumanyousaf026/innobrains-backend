const express = require("express");
const Visitor = require("../models/Visitor"); // Ensure the path to the model is correct
const router = express.Router();

// POST route to submit visitor data
router.post("/submit", async (req, res) => {
  const { FirstName, LastName, email, number, message } = req.body;

  try {
    const newVisitor = new Visitor({
      FirstName,
      LastName,
      email,
      number,
      message,
    });
    await newVisitor.save();
    res.status(201).json({ message: "Visitor data saved successfully" });
  } catch (error) {
    res.status(400).json({ error: "Error saving visitor data" });
  }
});

// GET route to retrieve all visitors
router.get("/", async (req, res) => {
  try {
    const visitors = await Visitor.find();
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving visitor data" });
  }
});

// GET route to retrieve a single visitor by ID
router.get("/:id", async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }
    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving visitor data" });
  }
});

// PUT route to update visitor data by ID
router.put("/:id", async (req, res) => {
  const { FirstName, LastName, email, number, message } = req.body;

  try {
    const updatedVisitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      { FirstName, LastName, email, number, message },
      { new: true, runValidators: true }
    );
    if (!updatedVisitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }
    res
      .status(200)
      .json({ message: "Visitor data updated successfully", updatedVisitor });
  } catch (error) {
    res.status(400).json({ error: "Error updating visitor data" });
  }
});

// DELETE route to remove a visitor by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedVisitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!deletedVisitor) {
      return res.status(404).json({ error: "Visitor not found" });
    }
    res.status(204).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting visitor data" });
  }
});

module.exports = router;
