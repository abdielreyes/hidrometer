import express from "express";
const router = express.Router();

import { getAlerts } from "../../controllers/alert.controller";

router.get("/", getAlerts);

export default router;
