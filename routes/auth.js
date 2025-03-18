const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const db = require("../config/db");
require("dotenv").config();

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

const authenticateToken = require("../middleware/authMiddleware");
const authorizeRole = require("../middleware/authorizeRole"); // ✅ Import Role Middleware

/** 
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 */
router.post(
  "/signup",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
    body("role").isIn(["student", "professor"]).withMessage("Invalid role"), // ✅ Validate Role
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role } = req.body;

    try {
      db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.length > 0) return res.status(400).json({ error: "User already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        db.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)", 
          [name, email, hashedPassword, role], 
          (err, result) => {
            if (err) return res.status(500).json({ error: "Database error" });

            // ✅ Generate JWT Token with role
            const token = jwt.sign(
              { userId: result.insertId, name: name, role: role }, 
              JWT_SECRET, 
              { expiresIn: "1h" }
            );

            res.status(201).json({ message: "User registered successfully", token });
          }
        );
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

/** 
 * @route   POST /api/auth/login
 * @desc    User login
 */
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Valid email is required"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (result.length === 0) return res.status(400).json({ error: "Invalid credentials" });

        const user = result[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // ✅ Generate JWT Token with role
        const token = jwt.sign(
          { userId: user.id, name: user.name, role: user.role },
          JWT_SECRET,
          { expiresIn: "1h" }
        );

        res.json({ message: "Login successful", token });
      });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  }
);

/** 
 * @route   GET /api/auth/student-dashboard
 * @desc    Access for students only
 */
router.get("/student-dashboard", authenticateToken, (req, res) => {
    if (req.user.role !== "student") {
        return res.status(403).json({ message: "Access Denied. Students only!" });
    }
    res.json({ message: `Welcome Student ${req.user.name}!` });
});

/** 
 * @route   GET /api/auth/professor-dashboard
 * @desc    Access for professors only
 */
router.get("/professor-dashboard", authenticateToken, (req, res) => {
    if (req.user.role !== "professor") {
        return res.status(403).json({ message: "Access Denied. Professors only!" });
    }
    res.json({ message: `Welcome Professor ${req.user.name}!` });
});

module.exports = router;
