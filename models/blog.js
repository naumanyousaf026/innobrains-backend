const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents without slug
      trim: true,
    },
    duration: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    content: [
      {
        type: {
          type: String,
          enum: ["paragraph", "heading", "subheading", "image"],
          required: true,
        },
        value: {
          type: String,
          required: true,
        },
      },
    ],
    images: {
      type: [String], // Optional general images, like featured images
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
