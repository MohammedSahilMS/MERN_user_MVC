const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require ("cors")

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Connect to the database
connectDB();

// Middleware to parse JSON
app.use(express.json());

//using cors
app.use(cors());

// Define your routes
app.use("/api/auth", require("./routes/authRoutes"));

// Define the port from environment variables or fallback to 5000
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
