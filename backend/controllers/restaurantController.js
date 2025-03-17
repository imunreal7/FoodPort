import Restaurant from "../models/Restaurant.js";
import asyncHandler from "../middleware/asyncHandler.js";
import redisClient from "../config/redisClient.js";

// Middleware to cache all restaurants
export const cacheRestaurants = asyncHandler(async (req, res, next) => {
    const cacheKey = "restaurants_all";
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
        return res.status(200).json(JSON.parse(cachedData));
    }
    res.locals.cacheKey = cacheKey;
    next();
});

// Controller to get all restaurants
export const restaurants = asyncHandler(async (req, res) => {
    const data = await Restaurant.find();
    if (res.locals.cacheKey) {
        await redisClient.set(res.locals.cacheKey, JSON.stringify(data), {
            EX: parseInt(process.env.REDIS_TTL) || 3600,
        });
    }
    res.status(200).json(data);
});

// Controller to add multiple restaurants
export const addRestaurants = asyncHandler(async (req, res) => {
    const restaurantsData = req.body; // Expect an array of restaurants
    const newRestaurants = await Restaurant.insertMany(restaurantsData);
    // Invalidate the cache for restaurants on update
    await redisClient.del("restaurants_all");
    res.status(201).json(newRestaurants);
});

