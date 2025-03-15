// server/routes/recommendationRoutes.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// POST /api/recommendations
router.post("/", authMiddleware, async (req, res) => {
    try {
        // Expecting request body to have user_id, dietary_preferences, and preferred_cuisine
        const { user_id, dietary_preferences, preferred_cuisine } = req.body;

        // Call the Python recommendation microservice
        const response = await axios.post("http://localhost:8000/recommendations", {
            user_id,
            dietary_preferences,
            preferred_cuisine,
        });

        // Return the recommendations to the frontend
        res.json(response.data);
    } catch (error) {
        // Handle errors
        console.error("Error fetching recommendations:", error.message);
        res.status(500).json({ msg: "Error fetching recommendations" });
    }
});

module.exports = router;
