const mongoose = require("mongoose");

const satisfieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  customerName: { type: String, required: true },
});

const Satisfie = mongoose.model("Satisfie", satisfieSchema);

module.exports = Satisfie;
