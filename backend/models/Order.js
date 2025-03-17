import { Schema, model } from "mongoose";

const orderItemSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },
        quantity: {
            type: Number,
            default: 1,
            min: 1,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    { _id: false },
);

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        items: [orderItemSchema],
        total: {
            type: Number,
            default: 0,
            min: 0,
        },
        shippingFee: {
            type: Number,
            default: 0,
            min: 0,
        },
        status: {
            type: String,
            enum: ["pending", "paid", "shipped", "delivered", "cancelled", "rejected"],
            default: "pending",
        },
        customerName: {
            type: String,
            required: true,
            trim: true,
        },
        customerPhone: {
            type: String,
            required: true,
            trim: true,
        },
        customerAddress: {
            type: String,
            required: true,
            trim: true,
        },
        instructions: {
            type: String,
            trim: true,
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
    { timestamps: true, versionKey: false },
);

export default model("Order", orderSchema);
