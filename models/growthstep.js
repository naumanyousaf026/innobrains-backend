const mongoose = require("mongoose");

const stepSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // path to the image
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Step = mongoose.model("Step", stepSchema);

module.exports = Step;
