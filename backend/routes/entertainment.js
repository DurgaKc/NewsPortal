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

router.get("/getEntertainment", getEntertainments);
router.get("/:id", getEntertainment);
router.post("/addEntertainment",upload.single("image"),addEntertainment);
router.put("/editEntertainment/:id",upload.single("image"),editEntertainment);
router.delete("/deleteEntertainment/:id", deleteEntertainment);

module.exports = router;
