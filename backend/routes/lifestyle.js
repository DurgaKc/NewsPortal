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

router.get("/getLifestyle", getLifestyles);
router.get("/:id", getLifestyle);
router.post("/addLifestyle",upload.single("image"),addLifestyle);
router.put("/editLifestyle/:id",upload.single("image"),editLifestyle);
router.delete("/deleteLifestyle/:id", deleteLifestyle);

module.exports = router;
