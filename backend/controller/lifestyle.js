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

// ✅ Get single post
const getLifestyle = async (req, res) => {
  try {
    const post = await Lifestyle.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Lifestyle post not found" });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add lifestyle post
const addLifestyle = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;
    if (!title || !description)
      return res.status(400).json({ message: "Title and description required" });

    const images = req.files["image"] ? req.files["image"].map(f => f.filename) : [];
    const videos = req.files["video"] ? req.files["video"].map(f => f.filename) : [];

    const newPost = await Lifestyle.create({ title, description, category, status, images, videos });
    res.status(201).json({ message: "Lifestyle added successfully", data: newPost });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit lifestyle post
const editLifestyle = async (req, res) => {
  try {
    const post = await Lifestyle.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Lifestyle post not found" });

    const images = req.files["image"] ? req.files["image"].map(f => f.filename) : post.images;
    const videos = req.files["video"] ? req.files["video"].map(f => f.filename) : post.videos;

    const updatedData = {
      title: req.body.title || post.title,
      description: req.body.description || post.description,
      category: req.body.category || post.category,
      status: req.body.status || post.status,
      images,
      videos,
    };

    const updated = await Lifestyle.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.status(200).json({ message: "Lifestyle updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete lifestyle post
const deleteLifestyle = async (req, res) => {
  try {
    const post = await Lifestyle.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Lifestyle post not found" });
    return res.json({ message: "Lifestyle deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post", error: error.message });
  }
};

module.exports = { getLifestyles, getLifestyle, addLifestyle, editLifestyle, deleteLifestyle };
