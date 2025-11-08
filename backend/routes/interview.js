const express = require("express");
const {
  getInterviews,
  getInterview,
  addInterview,
  editInterview,
  deleteInterview,
} = require("../controller/interview");
const upload = require("../middleware/upload");
const router = express.Router();

// ✅ Routes
router.get("/getInterviews", getInterviews); // get all interviews
router.get("/:id", getInterview); // get single interview
router.post("/addInterview", upload.single("video"), addInterview); // upload video instead of image
router.put("/editInterview/:id", upload.single("video"), editInterview); // edit interview
router.delete("/deleteInterview/:id", deleteInterview); // delete interview

module.exports = router;
