// backend/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; // Admin authentication routes


dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use("/api/products", productRoutes);
app.use("/api/admin", adminRoutes);


// Health check route
app.get("/", (req, res) => {
  res.send("E-commerce API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
