const mongoose = require("mongoose");

const lifestyleSchema = new mongoose.Schema({
  topic: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
  date: {
      type: String,
      required: true,
    },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

module.exports = mongoose.model("Lifestyle", lifestyleSchema);
