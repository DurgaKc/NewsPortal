const express = require("express");
const {
  getProvinces,
  getProvince,
  addProvince,
  editProvince,
  deleteProvince,
} = require("../controller/province");
const upload = require("../middleware/upload");

const router = express.Router();

// ✅ Province Routes
router.get("/getProvinces", getProvinces); // Get all provinces
router.get("/:id", getProvince); // Get single province
router.post("/addProvince", upload.single("image"), addProvince); // Add a province
router.put("/editProvince/:id", upload.single("image"), editProvince); // Edit a province
router.delete("/deleteProvince/:id", deleteProvince); // Delete a province

module.exports = router;
