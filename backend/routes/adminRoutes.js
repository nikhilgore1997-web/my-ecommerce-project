import express from "express";
import jwt from "jsonwebtoken";
import AdminModel from "../models/Admin.js";

const router = express.Router();

/**
 * @route   POST /api/admin/signup
 * @desc    Register a new admin
 */
router.post("/signup", async (req, res) => {
  try {
    const { firstName, surname, dob, gender, mobile, email, password } = req.body;

    // Check required fields
    if (!firstName || !surname || !dob || !gender || !mobile || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const adminId = "ADM" + Date.now();

    // Create new admin (password will be hashed by schema pre-save hook)
    const newAdmin = new AdminModel({
      adminId,
      firstName,
      surname,
      dob,
      gender,
      mobile,
      email,
      password
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      adminId,
      email
    });
  } catch (error) {
    console.error("Error in admin signup:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

/**
 * @route   POST /api/admin/login
 * @desc    Login admin and return JWT
 */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { adminId: admin.adminId, email: admin.email },
      process.env.JWT_SECRET || "secret123",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        adminId: admin.adminId,
        firstName: admin.firstName,
        surname: admin.surname,
        email: admin.email
      }
    });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

/**
 * Middleware to protect admin routes
 */
export const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret123");
    req.admin = decoded; // Attach admin info to request
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export default router;
