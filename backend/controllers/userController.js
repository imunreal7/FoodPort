const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("../middleware/asyncHandler");

// @desc Register a new user
exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, phone, avatar } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
        res.status(400);
        throw new Error("User already exists");
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user (include avatar if provided)
    user = new User({ name, email, phone, password: hashedPassword, avatar });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.json({ token, user: { id: user._id, name, email, avatar } });
});

// @desc Login user
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if the user exists
    let user = await User.findOne({ email });
    if (!user) {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400);
        throw new Error("Invalid credentials");
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });
    res.json({ token, user: { id: user._id, name: user.name, email, avatar: user.avatar } });
});

// @desc Get authenticated user
exports.getUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
});

// @desc Update user profile
exports.updateUser = asyncHandler(async (req, res) => {
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
