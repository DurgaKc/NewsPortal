const Entertainment = require("../models/entertainment");

// ✅ Get all entertainment posts
const getEntertainments = async (req, res) => {
  try {
    const posts = await Entertainment.find().sort({ date: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single entertainment post
const getEntertainment = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Entertainment.findById({_id:id});
    if (!post) return res.status(404).json({ message: "Entertainment post not found" });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add new entertainment post (images only)
const addEntertainment = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const image = req.file ? req.file.filename : null;

    const newPost = await Entertainment.create({
      topic,
      description,
      date,
      status,
      image,
    });

    return res.status(201).json({ message: "Entertainment post added successfully", data: newPost });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit entertainment post (images only)
const editEntertainment = async (req, res) => {
  try {
    const post = await Entertainment.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Entertainment post not found" });

    const updatedData = {
      topic: req.body.topic || post.topic,
      description: req.body.description || post.description,
      date: req.body.date || post.date,
      status: req.body.status || post.status,
      image: req.file ? req.file.filename : post.image,

    };

    const updatedPost = await Entertainment.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    return res.status(200).json({ message: "Entertainment post updated successfully", data: updatedPost });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete entertainment post
const deleteEntertainment = async (req, res) => {
  try {
    const post = await Entertainment.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Entertainment post not found" });
    return res.json({ message: "Entertainment post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting entertainment post", error: error.message });
  }
};

module.exports = {
  getEntertainments,
  getEntertainment,
  addEntertainment,
  editEntertainment,
  deleteEntertainment,
};
