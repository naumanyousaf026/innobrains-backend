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
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = path.extname(file.originalname);
    cb(null, 'blog-' + uniqueSuffix + extension);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF and WEBP are allowed.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

// ---------------------------- ROUTES ----------------------------

// Public route: Get only published blogs
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, tag } = req.query;
    const query = { status: "published" };

    if (category) query.category = category;
    if (tag) query.tags = { $in: [tag] };

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
    res.status(500).json({ error: "Failed to fetch blogs", details: err.message });
  }
});

// Admin route: Get all blogs (draft + published)
router.get("/admin/all", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch all blogs", details: err.message });
  }
});

// Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog || blog.status !== 'published') {
      return res.status(404).json({ error: "Blog not found or not published" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog", details: err.message });
  }
});

// Create a new blog
router.post("/", upload.single("featuredImage"), async (req, res) => {
  try {
    const { title, duration, category, content, tags, status = 'draft', author = 'Admin' } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    const newBlog = new Blog({
      title, slug, duration, category, content,
      status,
      author,
    });

    if (req.file) {
      newBlog.featuredImage = `/blogImages/${req.file.filename}`;
      newBlog.image = `/blogImages/${req.file.filename}`;
    }

    if (tags) {
      newBlog.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to save blog", details: err.message });
  }
});

// Update blog by ID
router.put("/:id", upload.single("featuredImage"), async (req, res) => {
  try {
    const { title, duration, category, content, tags, status, author } = req.body;
    const updateData = { title, duration, category, content, status, author };

    if (title) {
      updateData.slug = slugify(title, { lower: true, strict: true });
    }

    if (req.file) {
      const existingBlog = await Blog.findById(req.params.id);
      if (existingBlog && existingBlog.featuredImage) {
        const oldImagePath = path.join(__dirname, '..', existingBlog.featuredImage);
        if (fs.existsSync(oldImagePath)) fs.unlinkSync(oldImagePath);
      }

      updateData.featuredImage = `/blogImages/${req.file.filename}`;
      updateData.image = `/blogImages/${req.file.filename}`;
    }

    if (tags) {
      updateData.tags = typeof tags === 'string' ? JSON.parse(tags) : tags;
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true, runValidators: true
    });

    if (!updatedBlog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (err) {
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

    if (blog.featuredImage) {
      const imagePath = path.join(__dirname, '..', blog.featuredImage);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete blog", details: err.message });
  }
});

// Get blog by slug (for frontend display)
router.get("/slug/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: "published" });
    if (!blog) {
      return res.status(404).json({ error: "Blog not found or not published" });
    }
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blog", details: err.message });
  }
});

// Categories
router.get("/categories/all", async (req, res) => {
  try {
    const categories = await Blog.distinct("category");
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories", details: err.message });
  }
});

// Tags
router.get("/tags/all", async (req, res) => {
  try {
    const tags = await Blog.distinct("tags");
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tags", details: err.message });
  }
});

module.exports = router;
