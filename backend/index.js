const express = require("express");
require("dotenv").config();
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const mongoose = require("mongoose");
const morgan = require("morgan");

const products = require("./routes/productRoutes");
const restaurants = require("./routes/restaurantRoutes");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";
const DB_URI = isProduction ? process.env.DB_URI : "mongodb://localhost:27017/foodPort";
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX) || 100;
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000;

const app = express();

// Database Connection
mongoose
    .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Exit on DB connection failure
    });

// Middleware
app.use(express.json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// Configure CORS (Restrict in production)
app.use(
    cors({
        origin: isProduction ? FRONTEND_URL : "*", // Allow only frontend URL in production
        credentials: true,
    }),
);

// Logging HTTP requests (Use 'tiny' format for production)
app.use(morgan(isProduction ? "tiny" : "dev"));

// Rate Limiting (Adjust for production)
app.use(
    rateLimit({
        windowMs: RATE_LIMIT_WINDOW, // Time window in milliseconds
        max: isProduction ? RATE_LIMIT_MAX : 100, // Allow more requests in production
        message: "Too many requests, please try again later.",
    }),
);

// API Routes
app.use("/api/products", products);
app.use("/api/restaurants", restaurants);
app.use("/api/auth", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`));

