const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    restro_id: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    name: String,
    description: String,
    inStock: Boolean,
    isVeg: Boolean,
    price: Number,
    rating: Number,
    image: String,
});

module.exports = mongoose.model("Product", productSchema);
