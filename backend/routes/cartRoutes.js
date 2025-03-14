// routes/cartRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getCart, addToCart, removeFromCart, clearCart } = require("../controllers/cartController");

// All cart routes require user to be logged in
router.get("/", authMiddleware, getCart);
router.post("/add", authMiddleware, addToCart);
router.post("/remove", authMiddleware, removeFromCart);
router.post("/clear", authMiddleware, clearCart);

module.exports = router;
