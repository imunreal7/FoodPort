const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const cartController = require("../controllers/cartController");

// All cart routes require authentication
router.use(authMiddleware);

router.route("/").get(cartController.getCart); // Get the user's cart

router.route("/add").post(cartController.addToCart); // Add an item to the cart

router.route("/remove").patch(cartController.removeFromCart); // Remove an item from the cart

router.route("/clear").patch(cartController.clearCart); // Clear the entire cart

module.exports = router;
