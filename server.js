const express = require("express");
const multer = require("multer");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: 'https://innobrains.pk', // Only allow this domain
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Added PATCH method
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Updated allowed headers
  credentials: true, // If using cookies or credentials
  exposedHeaders: ['Content-Length', 'X-Requested-With'] // Optional: headers the server can expose
}));
app.options('*', cors());// Handle preflight requests

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static images from the 'src/images' directory
// Serve static images from the 'TeamImages' directory
app.use("/TeamImages", express.static(path.join(__dirname, "TeamImages")));
app.use("/ServiceImage", express.static(path.join(__dirname, "ServiceImage")));

app.use("/images", express.static(path.join(__dirname, "src/images")));

// Import route files
const reviewRoutes = require("./routes/review");
const teamRoutes = require("./routes/teamRoutes");
const achievementRoutes = require("./routes/achievementRoutes");

const partnerRoutes = require("./routes/partner");
const blogRoutes = require("./routes/blog");
const contactFormRoutes = require("./routes/ContactForm");
const productRoutes = require("./routes/product");
const serviceRoutes = require("./routes/service");
const satisfieRoutes = require("./routes/satisfieRoutes");
const contactInfoRoutes = require("./routes/contactInfoRoutes");
const growthStepRoutes = require("./routes/growthstep");
const adminRoutes = require("./routes/admin");
const aboutUsRoutes = require('./routes/aboutUs');
const companyValuesRoute = require('./routes/companyValues');
const stats = require('./routes/stats');
const privacyPolicyRoutes = require('./routes/privacyPolicyRoutes');
const refundRoutes = require('./routes/refund');
const termsRoutes = require('./routes/terms');
// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {
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
app.use("/api/contact", contactFormRoutes);
app.use("/api/product", productRoutes);
app.use("/api/service", serviceRoutes);

app.use("/api/team", teamRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/contact-info", contactInfoRoutes);
app.use("/api/satisfie", satisfieRoutes);
app.use("/api/growthsteps", growthStepRoutes);
app.use("/api/admin", adminRoutes);
app.use('/api/aboutus', aboutUsRoutes);
app.use('/api/company-values', companyValuesRoute);
app.use('/api/stats', stats);
app.use('/api/privacypolicy', privacyPolicyRoutes);

app.use("/api/refund", refundRoutes);
app.use("/api/terms", termsRoutes);
// Example backend route to get status
app.get("/api/status", (req, res) => {
  // Assuming status is stored in your DB
  const status = 1; // Or dynamically fetch it from DB
  res.json({ status });
});

app.use("/uploads", express.static(path.join(__dirname, "src/uploads")));
app.use("/blogImages", express.static(path.join(__dirname, "blogImages")));
app.use("/growthImage", express.static(path.join(__dirname, "growthImage")));

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
