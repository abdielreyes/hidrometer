import mongoose from "mongoose";

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
export default mongoose.model("Feedback", feedbackSchema);