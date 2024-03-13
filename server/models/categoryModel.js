const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    lowercase: true,
  },
  subCategories: [
    {
      name: {
        type: String,
        unique: true,
      },
      slug: {
        type: String,
        lowercase: true,
      },
    },
  ],
});

module.exports = mongoose.model("categories", categorySchema);
