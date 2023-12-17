import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const alertSchema = mongoose.Schema({
  alert_level: {
    type: String,
    required: true,
  },
  current_avg: {
    type: Number,
    required: true,
  },
  min_avg: {
    type: Number,
    required: true,
  },
  max_avg: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Aplica la paginación al modelo de alerta
alertSchema.plugin(mongoosePaginate);

export default mongoose.model("Alert", alertSchema);
