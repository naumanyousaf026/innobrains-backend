const mongoose = require("mongoose");
const fs = require("fs");
const Team = require("./models/team"); // Your Team model
const Achievements = require("./models/achievement"); // Achievements model

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/aboutUsApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Read the JSON file and extract the 'team' array
const jsonData = JSON.parse(fs.readFileSync("./data/teamData.json", "utf-8"));
const teamData = jsonData.team; // Extract 'team' array from the JSON

const jsonAchData = JSON.parse(
  fs.readFileSync("./data/achievementsData.json", "utf-8") // Corrected path
);
const achievementsData = jsonAchData.achievements; // Extract achievements array

// Insert achievements data into MongoDB
const importAchieveData = async () => {
  try {
    await Achievements.insertMany(achievementsData); // Insert the achievements array
    console.log("Achievements data imported successfully");
  } catch (err) {
    console.error("Error importing achievements data:", err); // Corrected error log
  }
};

// Insert team data into MongoDB
const importTeamData = async () => {
  try {
    await Team.insertMany(teamData); // Insert the team array
    console.log("Team data imported successfully");
  } catch (err) {
    console.error("Error importing team data:", err); // Corrected error log
  }
};

// Import data sequentially and close the connection after both are done
const importData = async () => {
  await importTeamData();
  await importAchieveData();
  mongoose.disconnect(); // Close the connection after inserting
};

importData();
