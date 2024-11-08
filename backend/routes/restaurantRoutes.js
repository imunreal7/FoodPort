const express = require("express");
const router = express.Router();

const { restaurants, addRestaurants } = require("../controllers/restaurantController");

router.get("/restaurants", restaurants);
router.post("/restaurants", addRestaurants);

module.exports = router;

