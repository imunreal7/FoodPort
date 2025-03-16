const express = require("express");
const router = express.Router();
const restaurantController = require("../controllers/restaurantController");

// Endpoints for restaurants
router
    .route("/")
    .get(restaurantController.restaurants) // Get all restaurants
    .post(restaurantController.addRestaurants); // Add multiple restaurants

module.exports = router;

