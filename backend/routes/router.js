import express from "express";
const router = express.Router();
import userRoutes from "./user/user.route.js";
import authRoutes from "./auth/verify.route.js";
import sensorRoutes from "./sensor/sensor.route.js";
router.use("/auth", authRoutes);
router.use("/user", userRoutes);
router.use("/sensor", sensorRoutes);
export default router;
