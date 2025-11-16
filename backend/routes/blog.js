// routes/blog.js
const express = require("express");
const {
  getBlogs,
  getBlog,
  addBlog,
  editBlog,
  deleteBlog,
} = require("../controller/blog");
const upload = require("../middleware/upload");
const router = express.Router();

router.get("/getBlogs", getBlogs);
router.get("/:id", getBlog);
router.post("/addBlog", upload.single("video"),addBlog);
router.put("/editBlog/:id",upload.single("video"),editBlog);
router.delete("/deleteBlog/:id", deleteBlog);

module.exports = router;