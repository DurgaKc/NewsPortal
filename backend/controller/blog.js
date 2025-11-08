const Blog = require("../models/blog");

// ✅ Get all blogs
const getBlogs = async (req, res) => {
  try {
    const posts = await Blog.find().sort({ date: -1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single blog
const getBlog = async (req, res) => {
  try {
    const post = await Blog.findById({_id:id});
    if (!post) return res.status(404).json({ message: "Blog not found" });
    return res.json(post);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add blog (image + video)
const addBlog = async (req, res) => {
  try {
    const { title, description, category, status } = req.body;

    if (!title || !description)
      return res.status(400).json({ message: "Title and description are required" });

    const images = req.files["image"] ? req.files["image"].map(f => f.filename) : [];
    const videos = req.files["video"] ? req.files["video"].map(f => f.filename) : [];

    const newPost = await Blog.create({ title, description, category, status, images, videos });
    res.status(201).json({ message: "Blog added successfully", data: newPost });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit blog
const editBlog = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog not found" });

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

    const updated = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.status(200).json({ message: "Blog updated successfully", data: updated });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete blog
const deleteBlog = async (req, res) => {
  try {
    const post = await Blog.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ message: "Blog not found" });
    return res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};

module.exports = { getBlogs, getBlog, addBlog, editBlog, deleteBlog };
