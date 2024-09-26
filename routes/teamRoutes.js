// teamRoutes.js
const express = require("express");
const router = express.Router();
const Team = require("../models/team");

// CREATE a new team member
// teamRoutes.js
router.post("/", async (req, res) => {
  try {
    const newTeamMember = new Team(req.body);
    const savedTeamMember = await newTeamMember.save();
    res.status(201).json(savedTeamMember);
  } catch (err) {
    console.error(err); // Log the error for debugging
    res.status(400).json({ error: "Failed to create team member" });
  }
});

// READ all team members
router.get("/", async (req, res) => {
  try {
    const team = await Team.find();
    res.json(team);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team members" });
  }
});

// READ a single team member by ID
router.get("/:id", async (req, res) => {
  try {
    const teamMember = await Team.findById(req.params.id);
    if (!teamMember)
      return res.status(404).json({ error: "Team member not found" });
    res.json(teamMember);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch team member" });
  }
});

// UPDATE a team member by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedTeamMember = await Team.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedTeamMember)
      return res.status(404).json({ error: "Team member not found" });
    res.json(updatedTeamMember);
  } catch (err) {
    res.status(400).json({ error: "Failed to update team member" });
  }
});

// DELETE a team member by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedTeamMember = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeamMember)
      return res.status(404).json({ error: "Team member not found" });
    res.json({ message: "Team member deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete team member" });
  }
});

module.exports = router;
