const express = require("express");
const router = express.Router();
const Blog = require("../models/blog"); // Import the Mongoose model

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog data" });
  }
});

// Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog data" });
  }
});

// Create a new blog
router.post("/", async (req, res) => {
  const { name, description, category, image, tags } = req.body;
  try {
    const newBlog = new Blog({
      name,
      description,
      category,
      image,
      tags,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to save blog data" });
  }
});

// Update a blog by ID
router.put("/:id", async (req, res) => {
  const { name, description, category, image, tags } = req.body;
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { name, description, category, image, tags },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog data" });
  }
});

// Delete a blog by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);

    if (!deletedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog data" });
  }
});

module.exports = router;
