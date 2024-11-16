const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Step = require("../models/growthstep");
// Adjust the path as needed

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "growthImage"); // Set the destination folder for images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique name with the original extension
  },
});

// Initialize multer
const upload = multer({ storage });

// Create a new step with image upload
router.post("/", upload.single("image"), async (req, res) => {
  const { number, title, description } = req.body;

  try {
    const newStep = new Step({
      number,
      image: req.file ? req.file.filename : null, // Store the filename if an image is uploaded
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

// Update a step by ID with image upload
router.put("/:id", upload.single("image"), async (req, res) => {
  const { number, title, description } = req.body;
  const updatedData = { number, title, description };

  if (req.file) {
    updatedData.image = req.file.filename; // Update the image if a new file is uploaded
  }

  try {
    const step = await Step.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });

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
