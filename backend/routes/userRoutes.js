import { Router } from "express";
const router = Router();
import { registerUser, loginUser, getUser, updateUser } from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", authMiddleware, getUser); // Protected route
router.patch("/update", authMiddleware, updateUser);

export default router;
