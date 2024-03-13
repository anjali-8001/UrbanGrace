const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      // only one user will login from one id
      unique: true,
    },
    password: {
      type: String,
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

module.exports = mongoose.model("guests", guestSchema);
