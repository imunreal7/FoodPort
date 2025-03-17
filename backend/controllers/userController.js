import User from "../models/User.js";
import { genSalt, hash, compare } from "bcryptjs";
import asyncHandler from "../middleware/asyncHandler.js";
import pkg from "jsonwebtoken";
const { sign } = pkg;

export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, avatar } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);

    // Create user (include avatar if provided)
    user = new User({ name, email, phone, password: hashedPassword, avatar });
    await user.save();

    // Generate JWT token
    const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token, user: { id: user._id, name, email, avatar } });
});

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    // Check password
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token, user: { id: user._id, name: user.name, email, avatar: user.avatar } });
});

export const getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
});

export const updateUser = asyncHandler(async (req, res) => {
    const { name, email, phone, dietaryPreferences, preferredCuisine, avatar } = req.body;

    const user = await User.findById(req.user.userId);
    user.name = name;
    user.email = email;
    user.phone = phone;
    user.dietaryPreferences = dietaryPreferences;
    user.preferredCuisine = preferredCuisine;
    user.avatar = avatar; // update avatar

    await user.save();
    res.json(user);
});
