import { Schema, model } from "mongoose";

const ProductSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        image: {
            type: String,
            trim: true,
        },
        price: {
            type: Number,
            required: true,
            min: 0,
        },
        cuisine: {
            type: String,
            required: true,
            trim: true,
        },
        ingredients: [
            {
                type: String,
                trim: true,
            },
        ],
        dietaryType: {
            type: String,
            enum: ["veg", "non-veg", "vegan"],
            required: true,
            lowercase: true,
        },
        category: {
            type: String,
            enum: ["starter", "main course", "dessert", "beverage"],
            lowercase: true,
        },
    },
    { timestamps: true, versionKey: false },
);

export default model("Product", ProductSchema);
