const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/me", authMiddleware, userController.getUser); // Protected route
router.patch("/update", authMiddleware, userController.updateUser);

module.exports = router;
