const express = require("express");
const {
  getEntertainments,
  getEntertainment,
  addEntertainment,
  editEntertainment,
  deleteEntertainment,
} = require("../controller/entertainment");

const upload = require("../middleware/upload");
const router = express.Router();

// ✅ Get all entertainment posts
router.get("/getEntertainment", getEntertainments);

// ✅ Get single entertainment post
router.get("/:id", getEntertainment);

// ✅ Add entertainment post (upload image + video)
router.post(
  "/addEntertainment",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "video", maxCount: 3 },
  ]),
  addEntertainment
);

// ✅ Edit entertainment post
router.put(
  "/editEntertainment/:id",
  upload.fields([
    { name: "image", maxCount: 5 },
    { name: "video", maxCount: 3 },
  ]),
  editEntertainment
);

// ✅ Delete entertainment post
router.delete("/deleteEntertainment/:id", deleteEntertainment);

module.exports = router;
