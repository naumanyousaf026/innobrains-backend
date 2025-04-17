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

// GET all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

// GET blog by slug (for SEO-friendly URL)
router.get("/slug/:slug", async (req, res) => {
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
router.post("/", upload.array("images", 10), async (req, res) => {
  const { title, duration, category, content, slug: manualSlug } = req.body;

  let contentArray;
  try {
    contentArray = typeof content === "string" ? JSON.parse(content) : content;
  } catch (err) {
    return res.status(400).json({ error: "Invalid content format" });
  }

  const imagePaths = req.files?.length
    ? req.files.map((file) => `/blogImages/${file.filename}`)
    : req.body.images || [];

  // Generate slug
  const slug = manualSlug
    ? slugify(manualSlug, { lower: true, strict: true })
    : slugify(title, { lower: true, strict: true });

  try {
    const newBlog = new Blog({
      title,
      slug,
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

// PUT: Update blog by ID
router.put("/:id", upload.array("images", 10), async (req, res) => {
  const { title, duration, category, content, slug: manualSlug } = req.body;

  let contentArray;
  try {
    contentArray = typeof content === "string" ? JSON.parse(content) : content;
  } catch (err) {
    return res.status(400).json({ error: "Invalid content format" });
  }

  const imagePaths = req.files?.length
    ? req.files.map((file) => `/blogImages/${file.filename}`)
    : [];

  const slug = manualSlug
    ? slugify(manualSlug, { lower: true, strict: true })
    : slugify(title, { lower: true, strict: true });

  try {
    const updateData = {
      title,
      slug,
      duration,
      category,
      content: contentArray,
    };

    if (imagePaths.length > 0) {
      updateData.$push = { images: { $each: imagePaths } };
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: "Failed to update blog" });
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
