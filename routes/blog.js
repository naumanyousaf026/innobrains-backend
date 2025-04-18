const express = require("express");
const multer = require("multer");
const path = require("path");
const slugify = require("slugify");
const Blog = require("../models/blog");
const router = express.Router();

// Set up Multer storage for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../blogImages"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Routes for blogs
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag, status } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };
    if (status) query.status = status;
    
    const blogs = await Blog.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select('-content');
    
    const count = await Blog.countDocuments(query);
    
    res.status(200).json({
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBlogs: count,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// Create a new blog
router.post("/", upload.single("featuredImage"), async (req, res) => {
  try {
    const { title, duration, category, content, tags, status, author } = req.body;
    
    const newBlog = new Blog({
      title,
      duration,
      category,
      content,
      status: status || 'draft',
      author: author || 'Admin',
    });
    
    if (req.file) {
      newBlog.featuredImage = `/uploads/${req.file.filename}`;
    }
    
    if (tags) {
      newBlog.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }
    
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("Error saving blog:", err);
    res.status(500).json({ error: "Failed to save blog", details: err.message });
  }
});

// Update blog by ID
router.put("/:id", upload.single("featuredImage"), async (req, res) => {
  try {
    const { title, duration, category, content, tags, status, author } = req.body;
    const updateData = { title, duration, category, content };
    
    if (status) updateData.status = status;
    if (author) updateData.author = author;
    
    if (title) {
      updateData.slug = slugify(title, { lower: true, strict: true });
    }
    
    if (req.file) {
      updateData.featuredImage = `/uploads/${req.file.filename}`;
    }
    
    if (tags) {
      updateData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ error: "Failed to update blog", details: err.message });
  }
});

// Delete blog by ID
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
