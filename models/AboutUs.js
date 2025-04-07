const mongoose = require('mongoose');

const aboutUsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  aboutTitle: { type: String, required: true },
  aboutDescription: { type: String, required: true },
});

const AboutUs = mongoose.model('AboutUs', aboutUsSchema);

module.exports = AboutUs;
