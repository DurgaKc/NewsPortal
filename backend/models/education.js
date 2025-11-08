const mongoose = require("mongoose");

const educationSchema = new mongoose.Schema({
  topic: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // single image
  },
   date: {
      type: String,
      required: true,
    },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

module.exports = mongoose.model("Education", educationSchema);
