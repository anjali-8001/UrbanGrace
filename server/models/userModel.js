const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      // only one user will login from one id
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      // required: true,
    },
    address: {
      type: String,
      // required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    //new user created time will be added
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
