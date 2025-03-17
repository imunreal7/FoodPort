import Product from "../models/Product.js";
import asyncHandler from "../middleware/asyncHandler.js";
import redisClient from "../config/redisClient.js";

// Middleware to cache all products
export const cacheProducts = asyncHandler(async (req, res, next) => {
    const cacheKey = "products_all";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        // If cached data exists, return it immediately
        return res.status(200).json(JSON.parse(cachedData));
    }
    // Save the cache key for later use
    res.locals.cacheKey = cacheKey;
    next();
});

// Controller to get all products
export const products = asyncHandler(async (req, res) => {
    // Retrieve products from the database
    const data = await Product.find({});
    // Store result in cache with TTL from .env (defaults to 3600 seconds)
    if (res.locals.cacheKey) {
        await redisClient.set(res.locals.cacheKey, JSON.stringify(data), {
            EX: parseInt(process.env.REDIS_TTL) || 3600,
        });
    }
    res.status(200).json(data);
});

// Controller to get product(s) by name
export const getProductByName = asyncHandler(async (req, res) => {
    const data = await Product.find({ name: req.query.name });
    res.status(200).json(data);
});

// Controller to get products of a specific restaurant
export const productsOfRestro = asyncHandler(async (req, res) => {
    const filtered = await Product.find({ restro_id: req.params.id });
    res.status(200).json(filtered);
});

// Controller to add multiple products
export const addProducts = asyncHandler(async (req, res) => {
    const productsData = req.body; // Expect an array of products
    const newProducts = await Product.insertMany(productsData);
    // Invalidate the cache for all products on update
    await redisClient.del("products_all");
    res.status(201).json(newProducts);
});

