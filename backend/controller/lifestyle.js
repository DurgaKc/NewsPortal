const Lifestyle = require("../models/lifestyle");

// ✅ Get all lifestyle posts
const getLifestyles = async (req, res) => {
  try {
    const posts = await Lifestyle.find().sort({ date: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single lifestyle post
const getLifestyle = async (req, res) => {
  try {
    const { id } = req.params;
    const single = await Lifestyle.findById({_id:id});
    if (!single) return res.status(404).json({ message: "Lifestyle post not found" });
    return res.json(single);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add new lifestyle post (image only)
const addLifestyle = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }
    const image = req.file ? req.file.filename : null;

    const newLifestyle = await Lifestyle.create({
      topic,
      description,
      date,
      status,
      image
    });

    res.status(201).json({
      message: "Lifestyle post added successfully",
      data: newLifestyle,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit lifestyle post (image only)
const editLifestyle = async (req, res) => {
  try {
    const post = await Lifestyle.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Lifestyle post not found" });

    const updatedData = {
      topic: req.body.topic || post.topic,
      description: req.body.description || post.description,
       date: req.body.date || post.date, 
      status: req.body.status || post.status,
      image: req.file ? req.file.filename : post.image,
    };

    const updated = await Lifestyle.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    return res.status(200).json({ message: "Lifestyle post updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete lifestyle post
const deleteLifestyle = async (req, res) => {
  try {
    const post = await Lifestyle.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Lifestyle post not found" });
    return res.json({ message: "Lifestyle post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting lifestyle post", error: error.message });
  }
};

module.exports = {
  getLifestyles,
  getLifestyle,
  addLifestyle,
  editLifestyle,
  deleteLifestyle,
};
