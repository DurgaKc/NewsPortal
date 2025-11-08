const Interview = require("../models/interview");

// ✅ Get all interviews
const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find();
    return res.json(interviews);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get single interview
const getInterview = async (req, res) => {
  try {
    const { id } = req.params;
    const singleInterview = await Interview.findById({_id:id});
    if (!singleInterview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    return res.json(singleInterview);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Add interview (with video)
const addInterview = async (req, res) => {
  try {
    const { topic, description, date, status } = req.body;

    if (!topic || !description || !date || !status) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const newInterview = await Interview.create({
      topic,
      description,
      date,
      status,
      video: req.file ? req.file.filename : null,
    });

    res.status(201).json({ message: "Interview added successfully", data: newInterview });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Edit interview (replace or keep video)
const editInterview = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);
    if (!interview) return res.status(404).json({ message: "Interview not found" });

    const updatedData = {
      topic: req.body.topic || interview.topic,
      description: req.body.description || interview.description,
      date: req.body.date || interview.date,
      status: req.body.status || interview.status,
      video: req.file ? req.file.filename : interview.video,
    };

    const updatedInterview = await Interview.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    return res.status(200).json(updatedInterview);
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Delete interview
const deleteInterview = async (req, res) => {
  try {
    const interview = await Interview.findByIdAndDelete(req.params.id);
    if (!interview) {
      return res.status(404).json({ message: "Interview not found" });
    }
    return res.json({ message: "Interview deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Error deleting interview", error: error.message });
  }
};

module.exports = {
  getInterviews,
  getInterview,
  addInterview,
  editInterview,
  deleteInterview,
};
