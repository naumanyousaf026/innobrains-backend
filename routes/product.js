const express = require("express");
const Product = require("../models/product");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../src/uploads")); // Updated path to store in src/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Unique filename with timestamp
  },
});

const upload = multer({ storage });

// Create a new product
router.post("/", upload.single("image"), async (req, res) => {
  try {
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : null, // Save only the filename
      link: req.body.link,
    });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to create product" });
  }
});

// Serve the uploaded images statically
router.use("/images", express.static(path.join(__dirname, "../src/uploads")));

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product data" });
  }
});

// Get a product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product data" });
  }
});

// Update a product
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const updatedProduct = {
      name: req.body.name,
      description: req.body.description,
      link: req.body.link,
      image: req.file ? req.file.filename : req.body.image, // Update image if a new one is uploaded
    };

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      updatedProduct,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to update product" });
  }
});

// Delete a product
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
});

module.exports = router;
