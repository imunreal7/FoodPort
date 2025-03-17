import { Schema, model } from "mongoose";

const cartItemSchema = new Schema(
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

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        items: [cartItemSchema],
        total: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    { timestamps: true, versionKey: false },
);

export default model("Cart", cartSchema);
