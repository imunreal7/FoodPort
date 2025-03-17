import { Router } from "express";
const router = Router();
import {
    restaurants,
    cacheRestaurants,
    addRestaurants,
} from "../controllers/restaurantController.js";

// Endpoints for restaurants
router
    .route("/")
    // The GET request uses caching middleware for restaurants
    .get(cacheRestaurants, restaurants)
    // Adding new restaurants will invalidate the cache in the controller
    .post(addRestaurants);

export default router;

