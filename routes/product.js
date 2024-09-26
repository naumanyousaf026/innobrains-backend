const express = require("express");
const Product = require("../models/product");
const router = express.Router();

// Create a new product
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: "Failed to create product" });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch product data" });
  }
});

// Other routes (get by ID, update, delete)...
// Make sure these are included if you plan to use them

module.exports = router;
