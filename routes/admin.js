const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/admin"); // Your model
const router = express.Router();

// Register Route
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, number } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new admin
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      number,
    });

    // Save admin to the database
    const savedAdmin = await newAdmin.save();
    res.json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Login Route

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if admin exists
    const admin = await Admin.findOne({ email });
    if (!admin) {
      console.log("Admin not found with email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("Password mismatch for admin:", admin);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate token with hard-coded secret
    const token = jwt.sign({ id: admin._id }, "your_jwt_secret_here", {
      expiresIn: "1h",
    });
    res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
