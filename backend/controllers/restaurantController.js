const Restaurant = require("../models/Restaurant");

// Get all restaurants
const restaurants = async (req, res) => {
    try {
        const data = await Restaurant.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add multiple restaurants
const addRestaurants = async (req, res) => {
    try {
        const restaurants = req.body; // Expect an array of restaurants
        const newRestaurants = await Restaurant.insertMany(restaurants);
        res.status(201).json(newRestaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    restaurants,
    addRestaurants,
};

