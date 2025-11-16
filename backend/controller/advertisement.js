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
    const ad = await Advertisement.findById({ _id: id });

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
     const { topic, description, date, status } = req.body;
     const normalizedStatus = status?.toLowerCase() === "active" ? "active" : "inactive";
 
     if (!topic || !description || !date || !status) {
       return res.status(400).json({ message: "Required fields can't be empty" });
     }
     const newAdvertisement = await Advertisement.create({
     topic: req.body.topic,
     description: req.body.description,
     date: req.body.date,
     status: normalizedStatus,
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
      status: req.body.status || ad.status,
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

module.exports = {
  getAdvertisements,
  getAdvertisement,
  addAdvertisement,
  editAdvertisement,
  deleteAdvertisement,
};
