import { Router } from "express";
const router = Router();
import authMiddleware from "../middleware/authMiddleware.js";
import {
    createOrder,
    getUserOrders,
    getSingleOrder,
    updateOrderStatus,
} from "../controllers/orderController.js";

// Orders routes (require authentication)
router
    .route("/")
    .post(authMiddleware, createOrder) // Create an order from the current cart
    .get(authMiddleware, getUserOrders); // Get all orders for the logged-in user

router
    .route("/:orderId")
    .get(authMiddleware, getSingleOrder) // Get a specific order
    .put(authMiddleware, updateOrderStatus); // Update order status (Consider role-based access)

export default router;
