const express = require("express");
const {
  getLatestNews,
  getSingleLatestNews,
  addLatestNews,
  editLatestNews,
  deleteLatestNews,
} = require("../controller/lastestnews");

const upload = require("../middleware/upload");
const router = express.Router();


router.get("/getLatestNews", getLatestNews);               
router.get("/:id", getSingleLatestNews);                 
router.post("/addLatestNews", upload.single("image"), addLatestNews);   
router.put("/editLatestNews/:id", upload.single("image"), editLatestNews); 
router.delete("/deleteLatestNews/:id", deleteLatestNews); 

module.exports = router;
