const mongoose = require("mongoose");

const latestNewsSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    author: { type: String, required: false },

    description: { type: String, required: true },

    image: { type: String, required: false },

    date: { type: Date, default: Date.now },

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LatestNews", latestNewsSchema);
