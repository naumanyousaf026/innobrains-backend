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
    // Changed from array of content blocks to rich HTML content
    content: {
      type: String,
      required: true,
    },
    featuredImage: {
      type: String, // Path to featured image
    },
    tags: {
      type: [String], // Array of tags
      default: [],
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    author: {
      type: String,
      default: 'Admin',
    },
  },
  { timestamps: true }
);

// Generate slug before saving if not provided
blogSchema.pre('save', function(next) {
  const slugify = require('slugify');
  if (!this.slug && this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;