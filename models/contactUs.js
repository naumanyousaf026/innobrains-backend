const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  message: { type: String, required: true },
});

// Check if the model is already compiled
const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

module.exports = Contact;
