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

  // Handle image files
  const imagePaths = req.files?.map((file) => `/blogImages/${file.filename}`) || [];

  // Generate slug
  const slug = manualSlug
    ? slugify(manualSlug, { lower: true, strict: true })
    : slugify(title, { lower: true, strict: true });

  try {
    // Process content blocks for any content images
    const processedContentBlocks = contentArray.map(block => {
      // Check if the block is an image block and has a reference to a content image
      if (block.type === 'image' && block.value.startsWith('contentImage_')) {
        // Find the index referenced in the content image
        const imageIndex = block.value.split('_')[1];
        // Update the block value with the actual file path if it exists
        if (req.files && req.files[imageIndex]) {
          block.value = `/blogImages/${req.files[imageIndex].filename}`;
        }
      }
      return block;
    });

    const newBlog = new Blog({
      title,
      slug,
      duration,
      category,
      content: processedContentBlocks,
      images: imagePaths,
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    console.error("Error saving blog:", err);
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

  // Process uploaded files
  const imagePaths = req.files?.map((file) => `/blogImages/${file.filename}`) || [];

  // Generate slug
  const slug = manualSlug
    ? slugify(manualSlug, { lower: true, strict: true })
    : slugify(title, { lower: true, strict: true });

  try {
    // Process content blocks for any content images
    const processedContentBlocks = contentArray.map(block => {
      // Check if the block is an image block and has a reference to a content image
      if (block.type === 'image' && block.value.startsWith('contentImage_')) {
        // Find the index referenced in the content image
        const imageIndex = block.value.split('_')[1];
        // Update the block value with the actual file path if it exists
        if (req.files && req.files[imageIndex]) {
          block.value = `/blogImages/${req.files[imageIndex].filename}`;
        }
      }
      return block;
    });

    // Prepare update data
    const updateData = {
      title,
      slug,
      duration,
      category,
      content: processedContentBlocks,
    };

    // If we have new images, add them to the images array
    if (imagePaths.length > 0) {
      // Get current blog to append to existing images
      const currentBlog = await Blog.findById(req.params.id);
      if (currentBlog) {
        // Combine existing images with new ones
        updateData.images = [...(currentBlog.images || []), ...imagePaths];
      } else {
        updateData.images = imagePaths;
      }
    }

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!updatedBlog) return res.status(404).json({ error: "Blog not found" });
    res.status(200).json(updatedBlog);
  } catch (err) {
    console.error("Error updating blog:", err);
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