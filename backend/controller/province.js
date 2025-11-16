const Province = require("../models/province");

// ✅ Get all provinces
const getProvinces = async (req, res) => {
  try {
    const provinces = await Province.find();
    return res.json(provinces);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single province
const getProvince = async (req, res) => {
  try {
    const { id } = req.params;
    const singleProvince = await Province.findById({ _id: id });
    if (!singleProvince) {
      return res.status(404).json({ message: "Province not found" });
    }
    return res.json(singleProvince);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add province
const addProvince = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const newProvince = await Province.create({
      topic,
      description,
      date,
      status,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: "Province added successfully", data: newProvince });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit province
const editProvince = async (req, res) => {
  try {
    const province = await Province.findById(req.params.id);
    if (!province) return res.status(404).json({ message: "Province not found" });

    const updatedData = {
      topic: req.body.topic || province.topic,
      description: req.body.description || province.description,
      date: req.body.date || province.date,
      status: req.body.status || province.status,
      image: req.file ? req.file.filename : province.image,
    };

    const updatedProvince = await Province.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.status(200).json(updatedProvince);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete province
const deleteProvince = async (req, res) => {
  try {
    const province = await Province.findByIdAndDelete(req.params.id);
    if (!province) {
      return res.status(404).json({ message: "Province not found" });
    }
    return res.json({ message: "Province deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting province", error: error.message });
  }
};

module.exports = {
  getProvinces,
  getProvince,
  addProvince,
  editProvince,
  deleteProvince,
};
