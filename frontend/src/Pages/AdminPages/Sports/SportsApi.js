import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add sports news
export const addSports = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/sports/addSports`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit sports news
export const updateSports = async (id, data, token) => {
  try {
    const formData = new FormData();

    if (data.topic) formData.append("topic", data.topic);
    if (data.description) formData.append("description", data.description);
    if (data.date) formData.append("date", data.date);
    if (data.status) formData.append("status", data.status);

    // Handle image: new file or existing filename
    if (data.image instanceof File) {
      formData.append("image", data.image); // New image uploaded
    } else if (data.image) {
      formData.append("existingImage", data.image); // Keep existing image
    }

    const response = await axios.put(
      `${backendUrl}/sports/editSports/${id}`,
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
    console.error("Error updating sports news:", error);
    throw error;
  }
};

// ✅ Delete sports news
export const deleteSports = async (id, token) => {
  return axios.delete(`${backendUrl}/sports/deleteSports/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all sports news
export const getAllSports = async () => {
  return axios.get(`${backendUrl}/sports/getSports`);
};

// ✅ Get single sports news
export const getSportsById = async (id) => {
  const response = await axios.get(`${backendUrl}/sports/${id}`);
  return response.data;
};
