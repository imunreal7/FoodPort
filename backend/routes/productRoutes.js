const express = require("express");
const router = express.Router();

const { products, productsOfRestro, addProducts } = require("../controllers/productController");

router.get("/products", products); // Get all products
router.get("/restaurant/:id", productsOfRestro); // Get products by restaurant ID
router.post("/products", addProducts); // Add a new product

module.exports = router;

