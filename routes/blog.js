const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const slugify = require("slugify");
const Blog = require("../models/blog");
const router = express.Router();

// Ensure upload directory exists
const blogImagesDir = path.join(__dirname, "../blogImages");
if (!fs.existsSync(blogImagesDir)) {
  fs.mkdirSync(blogImagesDir, { recursive: true });
}

// Set up Multer storage for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, blogImagesDir);
  },
  filename: (req, file, cb) => {
    // Create a safe filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'blog-' + uniqueSuffix + extension);
  },
});

// Add file filter to only allow image files
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP are allowed.'), false);
  }
};

const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB size limit
  }
});

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
      .select('-content'); // Exclude content for list view
    
    const count = await Blog.countDocuments(query);
    
    res.status(200).json({
      blogs,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalBlogs: count,
    });
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ error: "Failed to fetch blogs", details: err.message });
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
    res.status(500).json({ error: "Failed to fetch blog", details: err.message });
  }
});

// Create a new blog
router.post("/", upload.single("featuredImage"), async (req, res) => {
  try {
    const { title, duration, category, content, tags, status, author } = req.body;
    
    // Create slug from title
    const slug = slugify(title, { lower: true, strict: true });
    
    const newBlog = new Blog({
      title,
      slug,
      duration,
      category,
      content,
      status: status || 'draft',
      author: author || 'Admin',
    });
    
    // Handle the uploaded file
    if (req.file) {
      // Store the full path to the file in the database
      newBlog.featuredImage = `/blogImages/${req.file.filename}`;
      
      // For backward compatibility, also set the image field
      newBlog.image = `/blogImages/${req.file.filename}`;
    }
    
    // Handle tags
    if (tags) {
      try {
        newBlog.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (error) {
        console.error("Error parsing tags:", error);
        newBlog.tags = [];
      }
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
    
    // Update slug if title is changed
    if (title) {
      updateData.slug = slugify(title, { lower: true, strict: true });
    }
    
    // Handle the uploaded file
    if (req.file) {
      // Get the existing blog to check if we need to delete old image
      const existingBlog = await Blog.findById(req.params.id);
      if (existingBlog && existingBlog.featuredImage) {
        const oldImagePath = path.join(__dirname, '..', existingBlog.featuredImage);
        // Delete the old image if it exists
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      
      // Store the new image path
      updateData.featuredImage = `/blogImages/${req.file.filename}`;
      updateData.image = `/blogImages/${req.file.filename}`; // For backward compatibility
    }
    
    // Handle tags
    if (tags) {
      try {
        updateData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
      } catch (error) {
        console.error("Error parsing tags:", error);
      }
    }
    
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ error: "Failed to update blog", details: err.message });
  }
});

// Delete blog by ID
router.delete("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    
    // Delete associated image if it exists
    if (blog.featuredImage) {
      const imagePath = path.join(__dirname, '..', blog.featuredImage);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }
    
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ error: "Failed to delete blog", details: err.message });
  }
});

// Get blogs by slug
router.get("/slug/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog", details: err.message });
  }
});

// Get all categories
router.get("/categories/all", async (req, res) => {
  try {
    const categories = await Blog.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories", details: err.message });
  }
});

// Get all tags
router.get("/tags/all", async (req, res) => {
  try {
    const tags = await Blog.distinct("tags");
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tags", details: err.message });
  }
});

module.exports = router;