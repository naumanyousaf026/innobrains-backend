const mongoose = require("mongoose");

const statsSchema = new mongoose.Schema({
  headline: { type: String, required: true },
  description: { type: String, required: true },
  loyalClients: { type: Number, default: 0 },
  experts: { type: Number, default: 0 },
  yearsExperience: { type: Number, default: 0 },
  techAwards: { type: Number, default: 0 },
  lastUpdated: { type: Date, default: Date.now }
});

const Stats = mongoose.model("Stats", statsSchema);

module.exports = Stats;