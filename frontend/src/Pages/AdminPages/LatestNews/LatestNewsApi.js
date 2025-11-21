import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ==============================
// ✅ Add Latest News
// ==============================
export const addLatestNews = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("author", data.author);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);

  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/latestNews/addLatestNews`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ==============================
// ✅ Edit Latest News
// ==============================
export const updateLatestNews = async (id, data, token) => {
  try {
    const formData = new FormData();

    if (data.topic) formData.append("topic", data.topic);
    if (data.author) formData.append("author", data.author);
    if (data.description) formData.append("description", data.description);
    if (data.date) formData.append("date", data.date);
    if (data.status) formData.append("status", data.status);

    // New file or existing filename
    if (data.image instanceof File) {
      formData.append("image", data.image); // Upload new
    } else if (data.image) {
      formData.append("existingImage", data.image); // Keep old
    }

    const response = await axios.put(
      `${backendUrl}/latestNews/editLatestNews/${id}`,
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
    console.error("Error updating latest news:", error);
    throw error;
  }
};


//  Delete Latest News

export const deleteLatestNews = async (id, token) => {
  return axios.delete(`${backendUrl}/latestNews/deleteLatestNews/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};


//  Get All Latest News
export const getAllLatestNews = async () => {
  return axios.get(`${backendUrl}/latestNews/getLatestNews`);
};

// Get Single Latest News
export const getLatestNewsById = async (id) => {
  const response = await axios.get(`${backendUrl}/latestNews/${id}`);
  return response.data;
};
