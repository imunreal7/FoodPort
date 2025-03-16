const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const orderController = require("../controllers/orderController");

// Orders routes (require authentication)
router
    .route("/")
    .post(authMiddleware, orderController.createOrder) // Create an order from the current cart
    .get(authMiddleware, orderController.getUserOrders); // Get all orders for the logged-in user

router
    .route("/:orderId")
    .get(authMiddleware, orderController.getSingleOrder) // Get a specific order
    .put(authMiddleware, orderController.updateOrderStatus); // Update order status (Consider role-based access)

module.exports = router;
