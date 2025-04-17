const express = require("express");
const multer = require("multer");
const path = require("path");
const slugify = require("slugify");
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

// ======================= ROUTES ======================== //


// GET all blogs with pagination and filters
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
      .select('-content'); // Don't send content in list view for performance
    
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

// GET blog by slug (for SEO-friendly URL)
router.get("/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog by slug" });
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
router.post("/", upload.single("featuredImage"), async (req, res) => {
  try {
    const { title, duration, category, content, tags, status, author } = req.body;
    
    // Create new blog object
    const newBlog = new Blog({
      title,
      duration,
      category,
      content,
      status: status || 'draft',
      author: author || 'Admin',
    });
    
    // Handle featured image if uploaded
    if (req.file) {
      newBlog.featuredImage = `/uploads/${req.file.filename}`;
    }
    
    // Handle tags
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

// PUT: Update blog by ID
router.put("/:id", upload.single("featuredImage"), async (req, res) => {
  try {
    const { title, duration, category, content, tags, status, author } = req.body;
    
    // Prepare update data
    const updateData = {
      title,
      duration,
      category,
      content,
    };
    
    // Only update optional fields if provided
    if (status) updateData.status = status;
    if (author) updateData.author = author;
    
    // Handle slug generation if title changes
    if (title) {
      updateData.slug = slugify(title, { lower: true, strict: true });
    }
    
    // Handle featured image if uploaded
    if (req.file) {
      updateData.featuredImage = `/uploads/${req.file.filename}`;
    }
    
    // Handle tags
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

// Upload image for editor
router.post("/upload-image", upload.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No image uploaded" });
    }
    
    const imageUrl = `/uploads/${req.file.filename}`;
    res.status(200).json({ 
      location: imageUrl  // Using 'location' as TinyMCE expects this property
    });
  } catch (err) {
    console.error("Error uploading image:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// DELETE blog by ID
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