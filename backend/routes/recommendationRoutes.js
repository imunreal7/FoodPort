import { Router } from "express";
import axios from "axios";
const router = Router();
import authMiddleware from "../middleware/authMiddleware.js";
import asyncHandler from "../middleware/asyncHandler.js";

const isProduction = process.env.NODE_ENV === "production";
const recommendation_url = isProduction
    ? process.env.RECOMMENDATION_SERVICE_URL
    : "http://localhost:8000";

// POST /api/recommendations
router.post(
    "/",
    authMiddleware,
    asyncHandler(async (req, res) => {
        const { user_id, dietary_preferences, preferred_cuisine } = req.body;

        try {
            const response = await axios.post(`${recommendation_url}/recommendations`, {
                user_id,
                dietary_preferences,
                preferred_cuisine,
            });

            res.json(response.data);
        } catch (error) {
            console.error("Error fetching recommendations:", error.message);
            res.status(500).json({ error: "Failed to fetch recommendations" });
        }
    }),
);

export default router;
