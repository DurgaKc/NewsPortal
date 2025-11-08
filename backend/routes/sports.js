const express = require("express");
const {
  getSports,
  getSport,
  addSports,
  editSports,
  deleteSports,
} = require("../controller/sports");
const upload = require("../middleware/upload");
const router = express.Router();

// ✅ Routes
router.get("/getSports", getSports); // get all news
router.get("/:id", getSport); // get single news
router.post("/addSports", upload.single("image"), addSports); // add item
router.put("/editSports/:id", upload.single("image"), editSports); // edit news
router.delete("/deleteSports/:id", deleteSports); // delete news

module.exports = router;
