const mongoose = require("mongoose");

const entertainmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    trim: true,
  },
  images: {
    type: [String], // store multiple image file paths
    default: [],
  },
  videos: {
    type: [String], // store multiple video file paths
    default: [],
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

module.exports = mongoose.model("Entertainment", entertainmentSchema);
