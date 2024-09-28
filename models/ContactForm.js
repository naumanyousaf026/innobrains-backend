const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  email: { type: String, required: true },
  number: { type: String, required: true },
  message: { type: String, required: true },
});

const ContactForm =
  mongoose.models.ContactForm || mongoose.model("ContactForm", contactSchema);

module.exports = ContactForm;
