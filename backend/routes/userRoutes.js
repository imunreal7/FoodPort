const express = require("express");
const { registerUser, loginUser, getUser, updateUser } = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUser); // Protected route
router.patch("/update/:userId", authMiddleware, updateUser);

module.exports = router;
