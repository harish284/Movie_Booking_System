const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const authRoutes = require("./routes/authroute");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// MongoDB connection
async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://harishsiva2810:harish2810@cluster0.os0bhzu.mongodb.net/registration?retryWrites=true&w=majority&appName=Cluster0');
    console.log("MongoDB connected successfully");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => { 
       console.log(`Server running on http://localhost:${PORT}`);
    });
  }
  catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

connectDB();
