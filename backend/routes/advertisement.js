const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const {
  getAdvertisements,
  getAdvertisement,
  getPopupAdvertisements,
  addAdvertisement,
  editAdvertisement,
  deleteAdvertisement,
} = require("../controller/advertisement");

router.get("/getAdvertisement", getAdvertisements);
router.get("/:id", getAdvertisement);
router.get("/popups", getPopupAdvertisements);
router.post("/addAdvertisement", upload.single("image"), addAdvertisement);
router.put("/editAdvertisement/:id", upload.single("image"), editAdvertisement);
router.delete("/deleteAdvertisement/:id", deleteAdvertisement);

module.exports = router;
