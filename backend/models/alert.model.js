import mongoose from "mongoose";

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
