const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
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
  level: {
    type: String,
    enum: ["User", "Operator", "Admin"],
    default: "User",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
