// routes/orderRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
    createOrder,
    getUserOrders,
    getSingleOrder,
    updateOrderStatus,
} = require("../controllers/orderController");

// Create an order from the current cart
router.post("/", authMiddleware, createOrder);

// Get all orders for the logged-in user
router.get("/", authMiddleware, getUserOrders);

// Get a specific order
router.get("/:orderId", authMiddleware, getSingleOrder);

// (Optional) Update order status - typically admin only
router.put("/:orderId", authMiddleware, updateOrderStatus);

module.exports = router;
