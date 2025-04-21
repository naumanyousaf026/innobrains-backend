const mongoose = require("mongoose");

const RefundSectionSchema = new mongoose.Schema({
  sectionId: { type: Number, required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  items: { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model("RefundSection", RefundSectionSchema);
