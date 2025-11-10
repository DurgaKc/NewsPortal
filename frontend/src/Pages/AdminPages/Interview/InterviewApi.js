import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add Interview
export const addInterview = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.video) form.append("video", data.video); // upload video

  return axios.post(`${backendUrl}/interview/addInterview`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Update Interview
export const updateInterview = async (id, data, token) => {
  try {
    const formData = new FormData();

    if (data.topic) formData.append("topic", data.topic);
    if (data.description) formData.append("description", data.description);
    if (data.date) formData.append("date", data.date);
    if (data.status) formData.append("status", data.status);

    // Handle video: new file or existing filename
    if (data.video instanceof File) {
      formData.append("video", data.video); // new video uploaded
    } else if (data.video) {
      formData.append("existingVideo", data.video); // keep existing video
    }

    const response = await axios.put(
      `${backendUrl}/interview/editInterview/${id}`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating interview:", error);
    throw error;
  }
};

// ✅ Delete Interview
export const deleteInterview = async (id, token) => {
  return axios.delete(`${backendUrl}/interview/deleteInterview/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all Interviews
export const getAllInterview = async () => {
 const res = await axios.get(`${backendUrl}/interview/getInterviews`);
  return Array.isArray(res.data) ? res.data : res.data.data || [];
};

// ✅ Get single Interview by ID
export const getInterviewById = async (id) => {
  const response = await axios.get(`${backendUrl}/interview/${id}`);
  return response.data;
};
