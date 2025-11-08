const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getLifestyles,
  getLifestyle,
  addLifestyle,
  editLifestyle,
  deleteLifestyle,
} = require("../controller/lifestyle");

// ✅ Get all posts
router.get("/getLifestyle", getLifestyles);

// ✅ Get single post
router.get("/:id", getLifestyle);

// ✅ Add post (image + video)
router.post(
  "/addLifestyle",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "video", maxCount: 3 },
  ]),
  addLifestyle
);

// ✅ Edit post
router.put(
  "/editLifestyle/:id",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "video", maxCount: 3 },
  ]),
  editLifestyle
);

// ✅ Delete post
router.delete("/deleteLifestyle/:id", deleteLifestyle);

module.exports = router;
