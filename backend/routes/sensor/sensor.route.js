import express from "express";
const router = express.Router();

import Micro from "../../controllers/micro.controller";

router.get("/", (req, res) => {
  res.json(Micro);
});

export default router;
