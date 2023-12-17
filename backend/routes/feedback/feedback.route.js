import express from "express";
const router = express.Router();
import Feedback from "../../models/feedback.model.js";
import { createFeedback } from "../../controllers/feedback.controller";
router.post("/", async (req, res) => {
  try {
    const { feedback } = req.body;
    const f = await createFeedback(feedback);
    res.status(200).json({
      message: "Retroalimentación registrada correctamente",
      feedback: f,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al registrar feedback",
    });
  }
});
router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.limit) || 10;

    const options = {
      page,
      limit: perPage,
      sort: { date: -1 }, // Ordenar por fecha descendente (opcional)
    };

    const result = await Feedback.paginate({}, options);

    res.status(200).json({
      feedbacks: result.docs,
      currentPage: result.page,
      totalPages: result.totalPages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener feedbacks." });
  }
});

export default router;
