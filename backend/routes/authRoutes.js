import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AdminModel from "../models/Admin.js";

const router = express.Router();

// ================= ADMIN SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const existingAdmin = await AdminModel.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const adminId = "ADM" + Date.now();

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin with minimal fields; other fields default/empty
    const newAdmin = new AdminModel({
      adminId,
      email,
      password: hashedPassword,
      firstName: "",
      surname: "",
      dob: null,
      gender: "",
      mobile: ""
    });

    await newAdmin.save();

    res.status(201).json({ message: "Admin registered successfully", adminId });
  } catch (error) {
    console.error("Error in admin signup:", error);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// ================= ADMIN LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin
    const admin = await AdminModel.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT
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
        email: admin.email,
        firstName: admin.firstName,
        surname: admin.surname,
      },
    });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ message: "Server error during login" });
  }
});

export default router;


