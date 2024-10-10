const express = require("express");
const router = express.Router();
const Step = require("../models/growthstep"); // Adjust the path as needed

// Create a new step
router.post("/", async (req, res) => {
  const { number, image, title, description } = req.body;

  try {
    const newStep = new Step({
      number,
      image,
      title,
      description,
    });

    await newStep.save();
    res.status(201).json({ message: "Step created successfully!", newStep });
  } catch (error) {
    res.status(400).json({ message: "Error creating step", error });
  }
});

// Get all steps
router.get("/", async (req, res) => {
  try {
    const steps = await Step.find();
    res.status(200).json(steps);
  } catch (error) {
    res.status(400).json({ message: "Error fetching steps", error });
  }
});

// Get a specific step by ID
router.get("/:id", async (req, res) => {
  try {
    const step = await Step.findById(req.params.id);
    if (!step) {
      return res.status(404).json({ message: "Step not found" });
    }
    res.status(200).json(step);
  } catch (error) {
    res.status(400).json({ message: "Error fetching step", error });
  }
});

// Update a step by ID
router.put("/:id", async (req, res) => {
  const { number, image, title, description } = req.body;

  try {
    const step = await Step.findByIdAndUpdate(
      req.params.id,
      { number, image, title, description },
      { new: true } // Return the updated step
    );

    if (!step) {
      return res.status(404).json({ message: "Step not found" });
    }

    res.status(200).json({ message: "Step updated successfully", step });
  } catch (error) {
    res.status(400).json({ message: "Error updating step", error });
  }
});

// Delete a step by ID
router.delete("/:id", async (req, res) => {
  try {
    const step = await Step.findByIdAndDelete(req.params.id);

    if (!step) {
      return res.status(404).json({ message: "Step not found" });
    }

    res.status(200).json({ message: "Step deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting step", error });
  }
});

module.exports = router;
