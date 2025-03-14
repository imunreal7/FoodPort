// controllers/cartController.js
const Cart = require("../models/Cart");

// @desc    Get user's cart
// @route   GET /api/cart
exports.getCart = async (req, res) => {
    try {
        // req.user.userId is set by authMiddleware after verifying the JWT
        const cart = await Cart.findOne({ user: req.user.userId }).populate("items.product");
        // If user has no cart, return empty
        if (!cart) {
            return res.json({ items: [], total: 0 });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc    Add an item to cart (or increment quantity if exists)
// @route   POST /api/cart/add
exports.addToCart = async (req, res) => {
    try {
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
            cart.items.push({
                product: product,
                quantity,
                price,
            });
        }

        // Recalculate total
        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc    Remove a specific item from cart
// @route   POST /api/cart/remove
exports.removeFromCart = async (req, res) => {
    try {
        const { productId } = req.body;

        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        // Filter out the item to remove
        cart.items = cart.items.filter((item) => item.product.toString() !== productId);

        // Recalculate total
        cart.total = cart.items.reduce((acc, item) => acc + item.price * item.quantity, 0);

        await cart.save();
        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc    Clear the entire cart
// @route   POST /api/cart/clear
exports.clearCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        cart.items = [];
        cart.total = 0;
        await cart.save();

        res.json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};
