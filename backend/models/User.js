import { Schema, model } from "mongoose";

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            trim: true,
        },
        dietaryPreferences: {
            type: String,
            enum: ["veg", "non-veg", "vegan"],
            lowercase: true,
        },
        preferredCuisine: {
            type: String,
            trim: true,
        },
        avatar: {
            type: String,
            trim: true,
        },
    },
    { timestamps: true, versionKey: false },
);

UserSchema.set("toJSON", {
    transform: (doc, ret) => {
        delete ret.password; // Remove sensitive password field from output
        return ret;
    },
});

export default model("User", UserSchema);
