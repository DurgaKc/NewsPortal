const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  createLiterature,
  getAllLiterature,
  getLiteratureById,
  getCategories,
  updateLiterature,
  deleteLiterature,
} = require("../controller/literature");

// ✅ Create literature
router.post("/addLiterature", upload.single("image"), createLiterature);

// ✅ Get all literature
router.get("/getLiterature", getAllLiterature);

// ✅ Get categories for dropdown
router.get("/categories", getCategories);

// ✅ Get literature by ID
router.get("/:id", getLiteratureById);

// ✅ Update literature
router.put("/editLiterature/:id", upload.single("image"), updateLiterature);

// ✅ Delete literature
router.delete("/deleteLiterature/:id", deleteLiterature);

module.exports = router;
