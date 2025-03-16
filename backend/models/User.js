// models/User.js
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    dietaryPreferences: {
        type: String,
        enum: ["veg", "non-veg", "vegan"],
    },
    preferredCuisine: { type: String }, // e.g., "Italian", "Indian", etc.
    avatar: { type: String }, // new field to store the selected avatar URL
});

module.exports = mongoose.model("User", UserSchema);
