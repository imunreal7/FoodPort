import { Router } from "express";
const router = Router();
import {
    products,
    cacheProducts,
    addProducts,
    getProductByName,
    productsOfRestro,
} from "../controllers/productController.js";

// Endpoints for products
router
    .route("/")
    // The GET request uses the caching middleware
    .get(cacheProducts, products)
    // When new products are added, the cache is invalidated in the controller
    .post(addProducts);

router.get("/name", getProductByName); // Get products by name
router.get("/restaurant/:id", productsOfRestro); // Get products by restaurant ID

export default router;

