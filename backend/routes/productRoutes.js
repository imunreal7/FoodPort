const express = require("express");
const router = express.Router();

const { products, productsOfRestro, addProducts } = require("../controllers/productController");

router.get("/products", products);
router.get("/restaurant/:id", productsOfRestro);
router.post("/products", addProducts);

module.exports = router;

