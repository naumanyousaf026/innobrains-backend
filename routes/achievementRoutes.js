const express = require("express");
const router = express.Router();
const Achievement = require("../models/Achievement");

// Create a new achievement
router.post("/", async (req, res) => {
  try {
    const achievement = new Achievement(req.body);
    await achievement.save();
    res.status(201).send(achievement);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all achievements
router.get("/", async (req, res) => {
  try {
    const achievements = await Achievement.find();
    res.status(200).send(achievements);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a specific achievement by ID
router.get("/:id", async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);
    if (!achievement) {
      return res.status(404).send();
    }
    res.status(200).send(achievement);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update an achievement by ID
router.patch("/:id", async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!achievement) {
      return res.status(404).send();
    }
    res.status(200).send(achievement);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete an achievement by ID
router.delete("/:id", async (req, res) => {
  try {
    const achievement = await Achievement.findByIdAndDelete(req.params.id);
    if (!achievement) {
      return res.status(404).send();
    }
    res.status(200).send(achievement);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
