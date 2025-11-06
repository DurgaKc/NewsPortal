const News = require("../models/international");

// ✅ Get all news
const getInternationals = async (req, res) => {
  try {
    const news = await News.find();
    return res.json(news);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single news
const getInternational = async (req, res) => {
  try {
    const { id } = req.params;
    const singleNews = await News.findById({_id:id});
    if (!singleNews) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json(singleNews);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add news
const addInternational = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }
    const newNews = await News.create({
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

// ✅ Edit news
const editInternational = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });

    const updatedData = {
      topic: req.body.topic || news.topic,
      description: req.body.description || news.description,
      date: req.body.date || news.date,
      status: req.body.status || news.status,
      image: req.file ? req.file.filename : news.image,
    };

    const updatedNews = await News.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.status(200).json(updatedNews);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete news
const deleteInternational = async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json({ message: "News deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting news", error: error.message });
  }
};

module.exports = {
  getInternationals,
  getInternational,
  addInternational,
  editInternational,
  deleteInternational,
};
