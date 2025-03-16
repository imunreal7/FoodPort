const Restaurant = require("../models/Restaurant");
const asyncHandler = require("../middleware/asyncHandler");

// Get all restaurants
exports.restaurants = asyncHandler(async (req, res) => {
    const data = await Restaurant.find();
    res.status(200).json(data);
});

// Add multiple restaurants
exports.addRestaurants = asyncHandler(async (req, res) => {
    const restaurants = req.body; // Expect an array of restaurants
    const newRestaurants = await Restaurant.insertMany(restaurants);
    res.status(201).json(newRestaurants);
});

