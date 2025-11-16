const Blog = require("../models/blog");

// ✅ Get all blogs
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.json(blogs);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single blog
const getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const singleBlog = await Blog.findById({_id:id});
    if (!singleBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json(singleBlog);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add blog (with images and videos)
const addBlog = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    // const images = req.files["images"] ? req.files["images"].map(file => file.filename) : [];
    // const videos = req.files["videos"] ? req.files["videos"].map(file => file.filename) : [];

    const newBlog = await Blog.create({
      topic,
      description,
      date,
      status,
      video: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: "Blog added successfully", data: newBlog });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit blog (replace or keep images/videos)
const editBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // const images = req.files["images"] 
    //   ? req.files["images"].map(file => file.filename) 
    //   : blog.images;

    // const videos = req.files["videos"] 
    //   ? req.files["videos"].map(file => file.filename) 
    //   : blog.videos;

    const updatedData = {
      topic: req.body.topic || blog.topic,
      description: req.body.description || blog.description,
      date: req.body.date || blog.date,
      status: req.body.status || blog.status,
      video: req.file ? req.file.filename : interview.video,
    };

    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.status(200).json(updatedBlog);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  addBlog,
  editBlog,
  deleteBlog,
};