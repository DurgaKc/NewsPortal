const fs = require("fs");
const path = require("path");
const Literature = require("../models/literature");

// CREATE
exports.createLiterature = async (req, res) => {
  try {
    const { topic, author, category, description, date, status } = req.body;

    const entry = new Literature({
      topic,
      author,
      category,
      description,
      date,
      status,
      image: req.file ? req.file.filename : null,
    });

    await entry.save();

    res.status(201).json({
      message: "Literature added successfully",
      entry,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getAllLiterature = async (req, res) => {
  try {
    const data = await Literature.find().sort({ date: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BY ID
exports.getLiteratureById = async (req, res) => {
  try {
    const data = await Literature.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Not found" });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE (with optional new image upload)
exports.updateLiterature = async (req, res) => {
  try {
    const literatureId = req.params.id;
    const { topic, author, category, description, date, status } = req.body;

    const existing = await Literature.findById(literatureId);
    if (!existing) {
      return res.status(404).json({ message: "Not found" });
    }

    // If a new image is uploaded → delete old image
    if (req.file && existing.image) {
      const imagePath = path.join("uploads/literature", existing.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Update fields
    existing.topic = topic;
    existing.author = author;
    existing.category = category;
    existing.description = description;
    existing.date = date;
    existing.status = status;

    if (req.file) {
      existing.image = req.file.filename;
    }

    await existing.save();

    res.json({ message: "Literature updated successfully", existing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteLiterature = async (req, res) => {
  try {
    const literatureId = req.params.id;

    const data = await Literature.findById(literatureId);
    if (!data) return res.status(404).json({ message: "Not found" });

    // Delete image from folder
    if (data.image) {
      const imgPath = path.join("uploads/literature", data.image);
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath);
      }
    }

    await Literature.findByIdAndDelete(literatureId);

    res.json({ message: "Literature deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CATEGORY DROPDOWN
exports.getCategories = (req, res) => {
  res.json(["Poem", "Story", "Ghazal", "Muktak"]);
};
