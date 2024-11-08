const express = require("express");
const router = express.Router();

const { products, productsOfRestro } = require("../controllers/productController");

router.get("/products", products);
router.get("/restaurant/:id", productsOfRestro);

module.exports = router;

