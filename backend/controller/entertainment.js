const Entertainment = require("../models/entertainment");

// ✅ Get all entertainment posts
const getEntertainments = async (req, res) => {
  try {
    const news = await Entertainment.find().sort({ date: -1 });
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single entertainment post
const getEntertainment = async (req, res) => {
  try {
    const { id } = req.params;
    const single = await Entertainment.findById({_id:id});
    if (!single) return res.status(404).json({ message: "Entertainment not found" });
    return res.json(single);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add new entertainment post (image + video)
const addEntertainment = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description)
      return res.status(400).json({ message: "topic and description are required" });

    const images = req.files["image"]
      ? req.files["image"].map((file) => file.filename)
      : [];

    const videos = req.files["video"]
      ? req.files["video"].map((file) => file.filename)
      : [];

    const newEntertainment = await Entertainment.create({
      topic,
      description,
      date,
      status,
      images,
      videos,
    });

    res.status(201).json({
      message: "Entertainment added successfully",
      data: newEntertainment,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit entertainment post
const editEntertainment = async (req, res) => {
  try {
    const entertainment = await Entertainment.findById(req.params.id);
    if (!entertainment) return res.status(404).json({ message: "Entertainment not found" });

    const images = req.files["image"]
      ? req.files["image"].map((file) => file.filename)
      : entertainment.images;

    const videos = req.files["video"]
      ? req.files["video"].map((file) => file.filename)
      : entertainment.videos;

    const updatedData = {
      topic: req.body.topic || entertainment.topic,
      description: req.body.description || entertainment.description,
      status: req.body.status || entertainment.status,
      images,
      videos,
    };

    const updated = await Entertainment.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    return res.status(200).json({ message: "Entertainment updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete entertainment post
const deleteEntertainment = async (req, res) => {
  try {
    const entertainment = await Entertainment.findByIdAndDelete(req.params.id);
    if (!entertainment) return res.status(404).json({ message: "Entertainment not found" });
    return res.json({ message: "Entertainment deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting entertainment", error: error.message });
  }
};

module.exports = {
  getEntertainments,
  getEntertainment,
  addEntertainment,
  editEntertainment,
  deleteEntertainment,
};
