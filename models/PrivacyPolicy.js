// models/PrivacyPolicy.js
const mongoose = require("mongoose");

const PrivacyPolicySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("PrivacyPolicy", PrivacyPolicySchema);
