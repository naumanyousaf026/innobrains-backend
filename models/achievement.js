const mongoose = require("mongoose");

const achievementSchema = new mongoose.Schema({
  title: { type: String, required: true }, // e.g., "Achievements"
  description: { type: String, required: true }, // e.g., achievement description
  statistics: {
    projectsCompleted: { type: Number, required: true }, // e.g., 500
    yearOnYearGrowth: { type: Number, required: true }, // e.g., 200
    funded: { type: Number, required: true }, // e.g., 50 million
    downloads: { type: Number, required: true }, // e.g., 10000
  },
  date: { type: Date, required: true }, // Date for achievements
});

const Achievement = mongoose.model("Achievement", achievementSchema);
module.exports = Achievement;
