const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getHealths,
  getHealth,
  addHealth,
  editHealth,
  deleteHealth,
} = require("../controller/health");

// ✅ Get all health posts
router.get("/getHealth", getHealths);

// ✅ Get single post
router.get("/:id", getHealth);

// ✅ Add new post (image upload)
router.post("/addHealth", upload.single("image"), addHealth);

// ✅ Edit post (replace image if uploaded)
router.put("/editHealth/:id", upload.single("image"), editHealth);

// ✅ Delete post
router.delete("/deleteHealth/:id", deleteHealth);

module.exports = router;
