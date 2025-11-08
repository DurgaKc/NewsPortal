const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  category: { type: String, trim: true },
  images: { type: [String], default: [] },
  videos: { type: [String], default: [] },
   date: {
      type: String,
      required: true,
    },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

module.exports = mongoose.model("Blog", blogSchema);
