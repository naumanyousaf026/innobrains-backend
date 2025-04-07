
const mongoose = require('mongoose');

// Define the schema
const companyValuesSchema = new mongoose.Schema({
  headline: {
    type: String,
    required: true
  },
  sections: [
    {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      }
    }
  ]
});

// Create a model from the schema
const CompanyValues = mongoose.model('CompanyValues', companyValuesSchema);

module.exports = CompanyValues;
