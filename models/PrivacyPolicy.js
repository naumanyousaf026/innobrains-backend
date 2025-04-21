const mongoose = require("mongoose");

const PrivacyPolicySchema = new mongoose.Schema({
  sections: [
    {
      title: {
        type: String,
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("PrivacyPolicy", PrivacyPolicySchema);
