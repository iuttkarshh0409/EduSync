const express = require("express");
const cors = require("cors");
require("dotenv").config(); // Load environment variables FIRST
const db = require("./config/db"); // Ensure database connection is established

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Import auth routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("EduSync Backend is Running!");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
