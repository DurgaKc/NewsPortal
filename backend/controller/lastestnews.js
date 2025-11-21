const LatestNews = require("../models/latestnews");


//  Get all Latest News
const getLatestNews = async (req, res) => {
  try {
    const news = await LatestNews.find();
    return res.json(news);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Get Single Latest News
const getSingleLatestNews = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await LatestNews.findById(id);
    if (!item) {
      return res.status(404).json({ message: "News not found" });
    }
    return res.json(item);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Add Latest News
const addLatestNews = async (req, res) => {
  try {
    const { topic, author, description, date, status } = req.body;

    const normalizedStatus =
      status?.toLowerCase() === "active" ? "active" : "inactive";

    if (!topic || !description || !date || !status) {
      return res.status(400).json({
        message: "Required fields can't be empty",
      });
    }

    const newNews = await LatestNews.create({
      topic,
      author,
      description,
      date,
      status: normalizedStatus,
      image: req.file ? req.file.filename : null,
    });

    return res.status(201).json({
      message: "Latest news added successfully",
      data: newNews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


// Edit Latest News
const editLatestNews = async (req, res) => {
  try {
    const news = await LatestNews.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    const updatedData = {
      topic: req.body.topic || news.topic,
      author: req.body.author || news.author,
      description: req.body.description || news.description,
      date: req.body.date || news.date,
      status: req.body.status || news.status,
      image: req.file ? req.file.filename : news.image,
    };

    const updatedNews = await LatestNews.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    return res.status(200).json(updatedNews);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


//  Delete Latest News
const deleteLatestNews = async (req, res) => {
  try {
    const news = await LatestNews.findByIdAndDelete(req.params.id);
    if (!news) {
      return res.status(404).json({ message: "News not found" });
    }

    return res.json({
      message: "Latest News deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting news",
      error: error.message,
    });
  }
};

module.exports = {
  getLatestNews,
  getSingleLatestNews,
  addLatestNews,
  editLatestNews,
  deleteLatestNews,
};
