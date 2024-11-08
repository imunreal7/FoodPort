const express = require("express");
const router = express.Router();

const { restaurants, addRestaurants } = require("../controllers/restaurantController");

router.get("/restaurants", restaurants); // Get all restaurants
router.post("/restaurants", addRestaurants); // Add a new restaurant

module.exports = router;

