import { Schema, model } from "mongoose";

const restaurantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        cloudinaryImageId: {
            type: String,
            trim: true,
        },
        locality: {
            type: String,
            trim: true,
        },
        areaName: {
            type: String,
            trim: true,
        },
        costForTwo: {
            type: String,
            trim: true,
        },
        cuisines: [
            {
                type: String,
                trim: true,
            },
        ],
        avgRating: {
            type: Number,
            min: 0,
            max: 5,
            default: 0,
        },
        avgRatingString: {
            type: String,
            trim: true,
        },
        totalRatingsString: {
            type: String,
            trim: true,
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
        aggregatedDiscountInfoV3: {
            header: { type: String, trim: true },
            subHeader: { type: String, trim: true },
            discountTag: { type: String, trim: true },
        },
    },
    { timestamps: true, versionKey: false },
);

restaurantSchema.set("toJSON", {
    transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    },
});

export default model("Restaurant", restaurantSchema);
