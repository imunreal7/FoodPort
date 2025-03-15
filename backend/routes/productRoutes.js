const express = require("express");
const router = express.Router();

const {
    products,
    productsOfRestro,
    addProducts,
    getProductByName,
} = require("../controllers/productController");

router.get("/products", products); // Get all products
router.get("/restaurant/:id", productsOfRestro); // Get products by restaurant ID
router.post("/products", addProducts); // Add a new product
router.get("/products/name", getProductByName);

module.exports = router;

