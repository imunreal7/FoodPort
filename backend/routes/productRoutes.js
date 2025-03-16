const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Endpoints for products
router
    .route("/")
    .get(productController.products) // Get all products
    .post(productController.addProducts); // Add multiple products

router.get("/name", productController.getProductByName); // Get products by name
router.get("/restaurant/:id", productController.productsOfRestro); // Get products by restaurant ID

module.exports = router;

