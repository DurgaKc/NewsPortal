const express = require("express");
const {
  getLocalGovernments,
  getLocalGovernment,
  addLocalGovernment,
  editLocalGovernment,
  deleteLocalGovernment,
} = require("../controller/localgovernment");
const upload = require("../middleware/upload");
const router = express.Router();

// ✅ Routes
router.get("/getLocalGovernments", getLocalGovernments); // get all news
router.get("/:id", getLocalGovernment); // get single news
router.post("/addLocalGovernment", upload.single("image"), addLocalGovernment); // add item
router.put("/editLocalGovernment/:id", upload.single("image"), editLocalGovernment); // edit news
router.delete("/deleteLocalGovernment/:id", deleteLocalGovernment); // delete news

module.exports = router;
