const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: { type: String }, // URL or path to the product image
  name: { type: String, required: true }, // Product name
  description: { type: String, required: true }, // Product description
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;

// video: { type: String }, // URL or path to the product video
// links: [{ type: String }], // Array of URLs for related links
