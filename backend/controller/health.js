const Health = require("../models/health");

// ✅ Get all health posts
const getHealths = async (req, res) => {
  try {
    const posts = await Health.find().sort({ date: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single health post
const getHealth = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Health.findById({_id:id});
    if (!post) return res.status(404).json({ message: "Health post not found" });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add health post (image upload)
const addHealth = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const image = req.file ? req.file.filename : null;

    const newPost = await Health.create({
    topic: req.body.topic,
    description: req.body.description,
    date: req.body.date,
    status: req.body.status,
    image: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: "Health post added successfully", data: newPost });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit health post
const editHealth = async (req, res) => {
  try {
    const post = await Health.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Health post not found" });

    const updatedData = {
      topic: req.body.topic || post.topic,
      description: req.body.description || post.description,
      date: req.body.date || post.date,
      status: req.body.status || post.status,
      image: req.file ? req.file.filename : post.image,
    };

    const updated = await Health.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.status(200).json({ message: "Health post updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete health post
const deleteHealth = async (req, res) => {
  try {
    const post = await Health.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Health post not found" });
    return res.json({ message: "Health post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post", error: error.message });
  }
};

module.exports = {
  getHealths,
  getHealth,
  addHealth,
  editHealth,
  deleteHealth,
};
