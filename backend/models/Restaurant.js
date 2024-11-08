const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
    name: String,
    cloudinaryImageId: String,
    locality: String,
    areaName: String,
    costForTwo: String,
    cuisines: [String],
    avgRating: Number,
    avgRatingString: String,
    totalRatingsString: String,
    isOpen: Boolean,
    aggregatedDiscountInfoV3: {
        header: String,
        subHeader: String,
        discountTag: String,
    },
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
