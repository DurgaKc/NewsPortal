const LocalGovernment = require("../models/localgovernment");

// ✅ Get all local government news
const getLocalGovernments = async (req, res) => {
  try {
    const news = await LocalGovernment.find();
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single local government news
const getLocalGovernment = async (req, res) => {
  try {
    const { id } = req.params;
    const singleNews = await LocalGovernment.findById({_id:id});
    if (!singleNews) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json(singleNews);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add local government news
const addLocalGovernment = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const newNews = await LocalGovernment.create({
    topic: req.body.topic,
    description: req.body.description,
    date: req.body.date,
    status: req.body.status,
    image: req.file ? req.file.filename : null,
  });

    res.status(201).json({ message: "News added successfully", data: newNews });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit local government news
const editLocalGovernment = async (req, res) => {
  try {
    const news = await LocalGovernment.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    const updatedData = {
      topic: req.body.topic || news.topic,
      description: req.body.description || news.description,
      date: req.body.date || news.date,
      status: req.body.status || news.status,
      image: req.file ? req.file.filename : news.image,
    };

    const updatedNews = await LocalGovernment.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.status(200).json(updatedNews);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete local government news
const deleteLocalGovernment = async (req, res) => {
  try {
    const news = await LocalGovernment.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json({ message: "News deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting news", error: error.message });
  }
};

module.exports = {
  getLocalGovernments,
  getLocalGovernment,
  addLocalGovernment,
  editLocalGovernment,
  deleteLocalGovernment,
};
