const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static images
app.use("/images", express.static("src/images")); // Ensure this path is correct

// Import route files
const reviewRoutes = require("./routes/review");
const teamRoutes = require("./routes/teamRoutes");
const achievementRoutes = require("./routes/achievementRoutes");
const visitorRoutes = require("./routes/visitor");
const partnerRoutes = require("./routes/partner");
const blogRoutes = require("./routes/blog");
const contactRoutes = require("./routes/contactRoutes");
const productRoutes = require("./routes/product");
const serviceRoutes = require("./routes/service");
const satisfieRoutes = require("./routes/satisfieRoutes");
const contactInfoRoutes = require("./routes/contactInfoRoutes");

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/aboutUsApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Prefix routes
app.use("/api/reviews", reviewRoutes);
app.use("/api/partner", partnerRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/contact", contactRoutes);
app.use("/product", productRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/visitor", visitorRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/satisfie", satisfieRoutes);
// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
