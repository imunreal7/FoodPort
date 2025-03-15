// models/Product.js
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    image: String,
    price: { type: Number, required: true },
    cuisine: { type: String, required: true },
    ingredients: [String],
    dietaryType: {
        type: String,
        enum: ["veg", "non-veg", "vegan"],
        required: true,
    },
    category: {
        type: String,
        enum: ["starter", "main course", "dessert", "beverage"],
    },
});

module.exports = mongoose.model("Product", ProductSchema);
