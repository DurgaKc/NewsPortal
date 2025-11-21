const Advertisement = require("../models/advertisement");

// ✅ Get all advertisements
const getAdvertisements = async (req, res) => {
  try {
    const ads = await Advertisement.find();
    return res.json(ads);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Get single advertisement
const getAdvertisement = async (req, res) => {
  try {
    const { id } = req.params;
    const ad = await Advertisement.findById(id);

    if (!ad) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    return res.json(ad);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Add advertisement
const addAdvertisement = async (req, res) => {
  try {
    const { topic, description, date, status, Popup } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const normalizedStatus = status.toLowerCase() === "active" ? "active" : "inactive";
    const normalizedPopup = Popup?.toLowerCase() === "active" ? "active" : "inactive";

    const newAdvertisement = await Advertisement.create({
      topic,
      description,
      date,
      status: normalizedStatus,
      Popup: normalizedPopup,
      image: req.file ? req.file.filename : null,
    });

    return res.status(201).json({
      message: "Advertisement added successfully",
      data: newAdvertisement,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Edit advertisement
const editAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: "Advertisement not found" });
    }

    const updatedData = {
      topic: req.body.topic || ad.topic,
      description: req.body.description || ad.description,
      date: req.body.date || ad.date,
      status: req.body.status
        ? req.body.status.toLowerCase() === "active"
          ? "active"
          : "inactive"
        : ad.status,
      Popup: req.body.Popup
        ? req.body.Popup.toLowerCase() === "active"
          ? "active"
          : "inactive"
        : ad.Popup,
      image: req.file ? req.file.filename : ad.image,
    };

    const updatedAd = await Advertisement.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    return res.status(200).json(updatedAd);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// ✅ Delete advertisement
const deleteAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndDelete(req.params.id);
    if (!ad) {
      return res.status(404).json({
        message: "Advertisement not found",
      });
    }

    return res.json({ message: "Advertisement deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting advertisement",
      error: error.message,
    });
  }
};

// ✅ Get active popup advertisements
const getPopupAdvertisements = async (req, res) => {
  try {
    const popups = await Advertisement.find({
      status: "active",   // active status
      Popup: "active",    // popup field active
      image: { $exists: true, $ne: null }, // must have an image
    }).sort({ _id: -1 }); // latest first

    return res.status(200).json(popups);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};


module.exports = {
  getAdvertisements,
  getAdvertisement,
  addAdvertisement,
  editAdvertisement,
  deleteAdvertisement,
  getPopupAdvertisements, // <-- added
};
