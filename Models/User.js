const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email field not be empty"],
  },
  password: {
    type: String,
    required: [true, "password field should not be empty"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
