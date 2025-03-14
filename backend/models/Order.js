const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        items: [orderItemSchema],
        total: {
            type: Number,
            default: 0,
        },
        shippingFee: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "delivered", "cancelled", "rejected"],
            default: "pending", // e.g., "pending", "paid", "shipped", "delivered", etc.
        },
        // New fields for checkout details:
        customerName: {
            type: String,
            required: true,
        },
        customerPhone: {
            type: String,
            required: true,
        },
        customerAddress: {
            type: String,
            required: true,
        },
        instructions: {
            type: String,
        },
        deliveryOption: {
            type: String,
            enum: ["immediate", "scheduled"],
            default: "immediate",
        },
        scheduledTime: {
            type: Date,
        },
        paymentMethod: {
            type: String,
            enum: ["card", "upi", "cod"],
            default: "card",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
