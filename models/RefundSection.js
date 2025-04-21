const mongoose = require("mongoose");

const refundPolicySchema = new mongoose.Schema({
  sectionId: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: String,
  items: [
    {
      heading: { type: String },
      description: { type: String },
      points: [String]
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("RefundPolicy", refundPolicySchema);
