import { Router } from "express";
const router = Router();
import authMiddleware from "../middleware/authMiddleware.js";
import { getCart, addToCart, removeFromCart, clearCart } from "../controllers/cartController.js";

// All cart routes require authentication
router.use(authMiddleware);

router.route("/").get(getCart); // Get the user's cart

router.route("/add").post(addToCart); // Add an item to the cart

router.route("/remove").patch(removeFromCart); // Remove an item from the cart

router.route("/clear").patch(clearCart); // Clear the entire cart

export default router;
