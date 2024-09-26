const express = require("express");
const router = express.Router();
const Satisfie = require("../models/satisfie");

// Create a new satisfaction entry
router.post("/", async (req, res) => {
  try {
    const newSatisfie = new Satisfie(req.body);
    const savedSatisfie = await newSatisfie.save();
    res.status(201).json(savedSatisfie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all satisfaction entries
router.get("/", async (req, res) => {
  try {
    const satisfieList = await Satisfie.find();
    res.status(200).json(satisfieList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single satisfaction entry by ID
router.get("/:id", async (req, res) => {
  try {
    const satisfie = await Satisfie.findById(req.params.id);
    if (!satisfie) {
      return res.status(404).json({ message: "Satisfaction entry not found" });
    }
    res.status(200).json(satisfie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a satisfaction entry by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedSatisfie = await Satisfie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedSatisfie) {
      return res.status(404).json({ message: "Satisfaction entry not found" });
    }
    res.status(200).json(updatedSatisfie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a satisfaction entry by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedSatisfie = await Satisfie.findByIdAndDelete(req.params.id);
    if (!deletedSatisfie) {
      return res.status(404).json({ message: "Satisfaction entry not found" });
    }
    res.status(200).json({ message: "Satisfaction entry deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
