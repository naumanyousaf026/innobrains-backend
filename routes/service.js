// routes/service.js
const express = require("express");
const Service = require("../models/service"); // Adjust the path if needed
const router = express.Router();

// GET all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// CREATE a new service
router.post("/", async (req, res) => {
  const service = new Service({
    image: req.body.image,
    name: req.body.name,
    description: req.body.description,
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// UPDATE a service by ID
router.put("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE a service by ID
router.delete("/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
