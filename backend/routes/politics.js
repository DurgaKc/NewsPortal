const express = require("express");
const {
  getPolitics,
  getPolitic,
  addPolitics,
  editPolitics,
  deletePolitics,
} = require("../controller/Politics");
const upload = require("../middleware/upload");
const router = express.Router();

// ✅ Routes
router.get("/getPolitics", getPolitics); // get all news
router.get("/:id", getPolitic); // get single news
router.post("/addPolitics", upload.single("image"), addPolitics); // add item
router.put("/editPolitics/:id", upload.single("image"), editPolitics); // edit news
router.delete("/deletePolitics/:id", deletePolitics); // delete news

module.exports = router;
