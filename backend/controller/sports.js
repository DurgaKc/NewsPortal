const Sports = require("../models/sports");

// ✅ Get all sports news
const getSports = async (req, res) => {
  try {
    const news = await Sports.find();
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single sports news
const getSport = async (req, res) => {
  try {
    const { id } = req.params;
    const singleNews = await Sports.findById({_id:id});
    if (!singleNews) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json(singleNews);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add sports news
const addSports = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const newNews = await Sports.create({
      topic,
      description,
      date,
      status,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: "News added successfully", data: newNews });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit sports news
const editSports = async (req, res) => {
  try {
    const news = await Sports.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    const updatedData = {
      topic: req.body.topic || news.topic,
      description: req.body.description || news.description,
      date: req.body.date || news.date,
      status: req.body.status || news.status,
      image: req.file ? req.file.filename : news.image,
    };

    const updatedNews = await Sports.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.status(200).json(updatedNews);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete sports news
const deleteSports = async (req, res) => {
  try {
    const news = await Sports.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json({ message: "News deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting news", error: error.message });
  }
};

module.exports = {
  getSports,
  getSport,
  addSports,
  editSports,
  deleteSports,
};
