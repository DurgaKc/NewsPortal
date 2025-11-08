const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const { getBlogs, getBlog, addBlog, editBlog, deleteBlog } = require("../controller/blog");

// ✅ Get all blogs
router.get("/getBlog", getBlogs);

// ✅ Get single blog
router.get("/:id", getBlog);

// ✅ Add blog (image + video)
router.post(
  "/addBlog",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "video", maxCount: 3 }
  ]),
  addBlog
);

// ✅ Edit blog
router.put(
  "/editBlog/:id",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "video", maxCount: 3 }
  ]),
  editBlog
);

// ✅ Delete blog
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;
