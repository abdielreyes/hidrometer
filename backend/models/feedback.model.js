import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const feedbackSchema = new mongoose.Schema({
  feedback: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Aplica la paginación al modelo de comentarios (feedback)
feedbackSchema.plugin(mongoosePaginate);

export default mongoose.model("Feedback", feedbackSchema);
