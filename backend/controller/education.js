const Education = require("../models/education");

// ✅ Get all education posts
const getEducations = async (req, res) => {
  try {
    const posts = await Education.find()
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single education post
const getEducation = async (req, res) => {
  try {
     const { id } = req.params;
    const post = await Education.findById({_id:id});
    if (!post) return res.status(404).json({ message: "Education post not found" });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add education post (image upload)
const addEducation = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status)
      return res.status(400).json({ message: "topic and description are required" });

    const image = req.file ? req.file.filename : null;

    const newPost = await Education.create({
      topic,
      description,
      date,
      status,
      image,
    });

    res.status(201).json({ message: "Education post added successfully", data: newPost });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit education post
const editEducation = async (req, res) => {
  try {
    const post = await Education.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Education post not found" });

    const updatedData = {
      topic: req.body.topic || post.topic,
      description: req.body.description || post.description,
      date: req.body.date || post.date,
      status: req.body.status || post.status,
      image: req.file ? req.file.filename : post.image,
    };

    const updated = await Education.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    res.status(200).json({ message: "Education post updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete education post
const deleteEducation = async (req, res) => {
  try {
    const post = await Education.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Education post not found" });
    return res.json({ message: "Education post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting post", error: error.message });
  }
};

module.exports = {
  getEducations,
  getEducation,
  addEducation,
  editEducation,
  deleteEducation,
};
