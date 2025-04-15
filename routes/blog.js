const express = require("express");
const multer = require("multer");
const path = require("path");
const Blog = require("../models/blog");
const router = express.Router();

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../blogImages")); // Image upload path
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique image name
  },
});

const upload = multer({ storage: storage });

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// GET blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog data" });
  }
});

// POST: Create a new blog
router.post("/", upload.array("images", 10), async (req, res) => {
  const { title, duration, category, content } = req.body;
  let contentArray;

  try {
    contentArray = JSON.parse(content); // Convert stringified content to array
  } catch (err) {
    return res.status(400).json({ error: "Invalid content format" });
  }

  const imagePaths = req.files.map((file) => `/blogImages/${file.filename}`);

  try {
    const newBlog = new Blog({
      title,
      duration,
      category,
      content: contentArray,
      images: imagePaths,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to save blog" });
  }
});

// PUT: Update a blog
router.put("/:id", upload.array("images", 10), async (req, res) => {
  const { title, duration, category, content } = req.body;
  let contentArray;

  try {
    contentArray = JSON.parse(content); // Convert stringified content to array
  } catch (err) {
    return res.status(400).json({ error: "Invalid content format" });
  }

  const imagePaths = req.files.map((file) => `/blogImages/${file.filename}`);

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      {
        title,
        duration,
        category,
        content: contentArray,
        $push: { images: { $each: imagePaths } }, // Add new images to existing ones
      },
      { new: true }
    );

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
  }
});

// DELETE: Delete a blog
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog" });
  }
});

module.exports = router;
