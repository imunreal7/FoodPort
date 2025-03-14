// controllers/orderController.js
const Cart = require("../models/Cart");
const Order = require("../models/Order");

// @desc    Create an order from user's cart along with checkout details
// @route   POST /api/orders
exports.createOrder = async (req, res) => {
    try {
        // Destructure checkout details from the request body
        const {
            customerName,
            customerPhone,
            customerAddress,
            instructions,
            deliveryOption,
            scheduledTime, // expected as ISO string or date format
            paymentMethod,
        } = req.body;

        // Validate required fields
        if (!customerName || !customerPhone || !customerAddress) {
            return res.status(400).json({ msg: "Customer details are required" });
        }

        // Find the user's cart
        const cart = await Cart.findOne({ user: req.user.userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ msg: "Your cart is empty" });
        }

        // Set a default shipping fee (or calculate based on deliveryOption if needed)
        const shippingFee = 250;

        // Create a new order with the cart items and checkout details
        const newOrder = new Order({
            user: req.user.userId,
            items: cart.items.map((item) => ({
                product: item.product,
                quantity: item.quantity,
                price: item.price,
            })),
            total: cart.total,
            shippingFee,
            status: "pending",
            customerName,
            customerPhone,
            customerAddress,
            instructions,
            deliveryOption,
            scheduledTime: deliveryOption === "scheduled" ? scheduledTime : null,
            paymentMethod,
        });

        await newOrder.save();

        // Clear the user's cart
        cart.items = [];
        cart.total = 0;
        await cart.save();

        res.json(newOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc    Get all orders for the logged-in user
// @route   GET /api/orders
exports.getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.userId })
            .populate("items.product")
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc    Get a single order by ID (if it belongs to the user)
// @route   GET /api/orders/:orderId
exports.getSingleOrder = async (req, res) => {
    try {
        const { orderId } = req.params;
        const order = await Order.findOne({
            _id: orderId,
            user: req.user.userId,
        }).populate("items.product");

        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};

// (Optional) Admin route to update an order status
// @desc    Update order status (e.g., from 'pending' to 'shipped')
// @route   PUT /api/orders/:orderId
exports.updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        // In a real app, check if the user is an admin or the store owner
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ msg: "Order not found" });
        }

        order.status = status;
        await order.save();

        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server error" });
    }
};
