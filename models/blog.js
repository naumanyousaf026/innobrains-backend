const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  image: { type: String }, // Optional field for blog image
  name: { type: String, required: true }, // Ensure the name is required
  description: { type: String, required: true }, // Description is required
  category: { type: String, required: true }, // Category is required
  tags: [{ type: String }], // Optional tags as an array of strings
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
