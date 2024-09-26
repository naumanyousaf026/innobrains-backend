const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  message: { type: String, required: true },
});

const Visitor = mongoose.model("Visitor", visitorSchema);

module.exports = Visitor;
