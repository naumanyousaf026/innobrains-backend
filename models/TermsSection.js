const mongoose = require("mongoose");

const TermsSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  intro: { type: String, required: true },
  sections: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("TermsSection", TermsSectionSchema);
