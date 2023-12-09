const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  sensor1: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    unique: true,
    required: true,
  },
  role: {
    type: String,
    enum: ["user", "operator", "admin"],
    default: "user",
  },
});

const User = mongoose.model("Sensors", userSchema);

export default User;
