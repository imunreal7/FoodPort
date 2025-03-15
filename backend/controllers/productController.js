const Product = require("../models/Product");

// Get all products
const products = async (req, res) => {
    try {
        const data = await Product.find();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by name
const getProductByName = async (req, res) => {
    try {
        const data = await Product.find({ name: req.query.name });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get products by restaurant ID
const productsOfRestro = async (req, res) => {
    try {
        const filtered = await Product.find({ restro_id: req.params.id });
        res.status(200).json(filtered);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add multiple products
const addProducts = async (req, res) => {
    try {
        const products = req.body; // Expect an array of products
        const newProducts = await Product.insertMany(products);
        res.status(201).json(newProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    products,
    productsOfRestro,
    addProducts,
    getProductByName,
};

