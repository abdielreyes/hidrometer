import express from "express";
const router = express.Router();
import userRoutes from "./user/UserRoutes.js";
import authRoutes from "./auth/verify/verifyRoutes.js";
router.use("/auth", authRoutes);
router.use("/user", userRoutes);

export default router;
