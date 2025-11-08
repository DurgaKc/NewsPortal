const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getEducations,
  getEducation,
  addEducation,
  editEducation,
  deleteEducation,
} = require("../controller/education");


router.get("/getEducation", getEducations);
router.get("/:id", getEducation);
router.post("/addEducation", upload.single("image"), addEducation);
router.put("/editEducation/:id", upload.single("image"), editEducation);
router.delete("/deleteEducation/:id", deleteEducation);

module.exports = router;
