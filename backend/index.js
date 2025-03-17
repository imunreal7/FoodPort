// Load environment variables at the very top
import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module"; // Fix: import createRequire from "module"
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import { connect } from "mongoose";
import morgan from "morgan";
import session from "express-session";

// Use createRequire to import the CommonJS module connect-redis
const require = createRequire(import.meta.url);
const RedisStore = require("connect-redis")(session);

import redisClient from "./config/redisClient.js";

import products from "./routes/productRoutes.js";
import restaurants from "./routes/restaurantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import recommendationRoutes from "./routes/recommendationRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

// Create __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Environment variables and settings
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";
const DB_URI = isProduction ? process.env.DB_URI : "mongodb://localhost:27017/foodPort";
const FRONTEND_URL = process.env.FRONTEND_URL || "*";
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX) || 100;
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000;

const app = express();

// Middleware Setup
app.use(cookieParser());
app.use(json());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

app.use(
    cors({
        origin: isProduction ? FRONTEND_URL : "*",
        credentials: true,
    }),
);

app.use(morgan(isProduction ? "tiny" : "dev"));

app.use(
    rateLimit({
        windowMs: RATE_LIMIT_WINDOW,
        max: isProduction ? RATE_LIMIT_MAX : 100,
        message: "Too many requests, please try again later.",
    }),
);

// Session middleware using Redis for session storage
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.JWT_SECRET || "defaultsecret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: isProduction },
    }),
);

// Connect to MongoDB
connect(DB_URI)
    .then(() => console.log("✅ Connected to MongoDB"))
    .catch((error) => {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1);
    });

// API Routes
app.use("/api/products", products);
app.use("/api/restaurants", restaurants);
app.use("/api/auth", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Error handling middleware (should be the last middleware)
app.use(errorHandler);

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${NODE_ENV} mode`));

