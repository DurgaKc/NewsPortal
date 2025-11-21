const mongoose = require("mongoose");

const literatureSchema = new mongoose.Schema(
  {
    topic: { type: String, required: true },
    author: { type: String, required: false },

    category: {
      type: String,
      enum: ["Poem", "Story", "Ghazal", "Muktak"],
      required: true,
    },

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

module.exports= mongoose.model("Literature", literatureSchema);
