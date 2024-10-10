const mongoose = require("mongoose"); // Importing Mongoose for MongoDB interactions

// Define the schema for the blog data
const blogSchema = new mongoose.Schema({
  image: { type: String }, // Optional field for the blog image, allows storing image URL or path
  name: { type: String, required: true }, // Name of the blog post, required field
  description: { type: String, required: true }, // Description of the blog post, required field
  category: { type: String, required: true }, // Category of the blog post, required field
  tags: [{ type: String }], // Optional field for tags, stored as an array of strings
});

// Create the Blog model using the schema
const Blog = mongoose.model("Blog", blogSchema);

// Export the Blog model for use in other parts of the application
module.exports = Blog;
