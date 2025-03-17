// controllers/cartController.js
import Cart from "../models/Cart.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getCart = asyncHandler(async (req, res) => {
    const cart = await Cart.findOne({ user: req.user.userId }).populate("items.product");
    if (!cart) {
        return res.json({ items: [], total: 0 });
    }
    res.json(cart);
});

export const addToCart = asyncHandler(async (req, res) => {
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

export const removeFromCart = asyncHandler(async (req, res) => {
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

export const clearCart = asyncHandler(async (req, res) => {
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
