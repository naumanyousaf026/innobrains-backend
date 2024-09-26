const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // Optional field for the team member's image
});

const Team = mongoose.model("Team", teamSchema);
module.exports = Team;
