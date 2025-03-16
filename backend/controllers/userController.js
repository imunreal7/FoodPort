const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @desc Register a new user
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password, phone, avatar } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: "User already exists" });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user (include avatar if provided)
        user = new User({ name, email, phone, password: hashedPassword, avatar });
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: user._id, name, email, avatar } });
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc Login user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: "Invalid credentials" });

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

        res.json({ token, user: { id: user._id, name: user.name, email, avatar: user.avatar } });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc Get authenticated user
exports.getUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");
        res.json(user);
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};

// @desc Update user profile
exports.updateUser = async (req, res) => {
    try {
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
    } catch (err) {
        res.status(500).json({ msg: "Server error" });
    }
};
