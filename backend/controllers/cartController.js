// controllers/cartController.js
const Cart = require("../models/Cart");
const asyncHandler = require("../middleware/asyncHandler");

// @desc    Get user's cart
// @route   GET /api/cart
exports.getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.userId }).populate("items.product");
    if (!cart) {
        return res.json({ items: [], total: 0 });
    }
    res.json(cart);
});

// @desc    Add an item to cart (or increment quantity if exists)
// @route   POST /api/cart/add
exports.addToCart = asyncHandler(async (req, res) => {
    const { product, quantity, price } = req.body;

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
        cart = new Cart({ user: req.user.userId, items: [], total: 0 });
    }

    // Check if item already in cart
    const itemIndex = cart.items.findIndex((item) => item.product.toString() === product);
    if (itemIndex > -1) {
        // Item exists, update quantity
        cart.items[itemIndex].quantity += quantity;
    } else {
        // Push a new item
        cart.items.push({ product, quantity, price });
    }

    // Recalculate total
    cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    res.json(cart);
});

// @desc    Remove a specific item from cart
// @route   POST /api/cart/remove
exports.removeFromCart = asyncHandler(async (req, res) => {
    const { productId } = req.body;
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    // Filter out the item to remove
    cart.items = cart.items.filter((item) => item.product.toString() !== productId);
    // Recalculate total
    cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    await cart.save();
    res.json(cart);
});

// @desc    Clear the entire cart
// @route   POST /api/cart/clear
exports.clearCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.userId });
    if (!cart) {
        res.status(404);
        throw new Error("Cart not found");
    }

    cart.items = [];
    cart.total = 0;
    await cart.save();
    res.json(cart);
});
