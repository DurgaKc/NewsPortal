const mongoose = require("mongoose");

const entertainmentSchema = new mongoose.Schema({
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
    type: String,
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
