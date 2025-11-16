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
router.get("/:id", getLifestyle);
router.post("/addLifestyle",upload.single("image"),addLifestyle);
router.post("/editLifestyle/:id",upload.single("image"),editLifestyle);
router.delete("/deleteLifestyle/:id", deleteLifestyle);

module.exports = router;
