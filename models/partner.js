const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema({
  logo: { type: String, required: true },
  name: { type: String, required: true },
  links: [String],
  description: { type: String, required: true },
});

const Partner = mongoose.model("Partner", partnerSchema);
module.exports = Partner;
