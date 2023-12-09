import express from "express";
const router = express.Router();
import { createFeedback } from "../../controllers/feedback.controller";
router.post("/", async (req, res) => {
    try {

        const { feedback } = req.body;
        const f = await createFeedback(feedback)
        res.status(200).json({
            message: "Retroalimentación registrada correctamente",
            feedback: f,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error al registrar feedback",
        });
    }
}
)


export default router