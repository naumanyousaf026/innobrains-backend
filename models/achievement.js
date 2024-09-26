const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  projectsCompleted: { type: String, required: true }, // e.g., "500+"
  yearOnYearGrowth: { type: String, required: true }, // e.g., "200%"
  funded: { type: String, required: true }, // e.g., "$50m"
  downloads: { type: String, required: true }, // e.g., "10k"
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
