import dotenv from "dotenv";
dotenv.config();

import express, { json } from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import morgan from "morgan";
import session from "express-session";

// Use createRequire to import the CommonJS module connect-redis
const require = createRequire(import.meta.url);
const RedisStore = require("connect-redis")(session);

import redisClient from "./config/redisClient.js";
import { connectToMongo } from "./config/mongoConfig.js";

// Import routes
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

// Check required environment variables
if (!process.env.SESSION_SECRET) {
    console.error("❌ SESSION_SECRET is required but missing!");
    process.exit(1);
}

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";
const isProduction = NODE_ENV === "production";
const RATE_LIMIT_MAX = parseInt(process.env.RATE_LIMIT_MAX) || 100;
const RATE_LIMIT_WINDOW = parseInt(process.env.RATE_LIMIT_WINDOW) || 15 * 60 * 1000;

// Create Express app
const app = express();

// Middleware Setup
app.use(cookieParser());
app.use(json());
app.use(
    helmet({
        crossOriginResourcePolicy: { policy: "same-origin" },
    }),
);
app.use(mongoSanitize());
app.use(xss());

// CORS Setup with whitelist
const allowedOrigins = process.env.FRONTEND_URL
    ? [process.env.FRONTEND_URL, "http://localhost:3000"]
    : ["http://localhost:3000"];
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    }),
);

app.use(morgan(isProduction ? "tiny" : "dev"));

// Rate Limiting Middleware
const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW,
    max: isProduction ? RATE_LIMIT_MAX : 100,
    handler: (req, res) => {
        console.warn(`⚠️ Too many requests from IP: ${req.ip}`);
        res.status(429).json({ message: "Too many requests, please try again later." });
    },
});
app.use(limiter);

// Session middleware using Redis for session storage
app.use(
    session({
        store: new RedisStore({ client: redisClient }),
        secret: process.env.SESSION_SECRET || "defaultsecret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: isProduction },
    }),
);

// Connect to MongoDB
connectToMongo();

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

// Graceful shutdown
process.on("SIGINT", async () => {
    console.log("🛑 Shutting down gracefully...");
    try {
        await redisClient.quit();
        await mongoose.connection.close();
        process.exit(0);
    } catch (error) {
        console.error("Error during shutdown:", error);
        process.exit(1);
    }
});

