const Restaurant = require("../models/Restaurant");

const restaurants = async (req, res) => {
    try {
        const data = await Restaurant.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    restaurants,
};

