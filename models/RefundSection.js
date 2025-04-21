const mongoose = require("mongoose");

const RefundSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("RefundSection", RefundSectionSchema);
