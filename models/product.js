const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: { type: String }, // URL or path to the product image
  name: { type: String, required: true }, // Product name
  description: { type: String, required: true }, // Product description
  link: { type: String }, // Product related link
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
