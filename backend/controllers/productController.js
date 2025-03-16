const Product = require("../models/Product");
const asyncHandler = require("../middleware/asyncHandler");

// Get all products
exports.products = asyncHandler(async (req, res) => {
    const data = await Product.find();
    res.status(200).json(data);
});

// Get products by name
exports.getProductByName = asyncHandler(async (req, res) => {
    const data = await Product.find({ name: req.query.name });
    res.status(200).json(data);
});

// Get products by restaurant ID
exports.productsOfRestro = asyncHandler(async (req, res) => {
    const filtered = await Product.find({ restro_id: req.params.id });
    res.status(200).json(filtered);
});

// Add multiple products
exports.addProducts = asyncHandler(async (req, res) => {
    const products = req.body; // Expect an array of products
    const newProducts = await Product.insertMany(products);
    res.status(201).json(newProducts);
});

