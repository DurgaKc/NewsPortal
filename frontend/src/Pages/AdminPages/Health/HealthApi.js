import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add health news
export const addHealth = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/health/addHealth`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit health news
export const updateHealth = async (id, data, token) => {
  try {
    const formData = new FormData();

    if (data.topic) formData.append("topic", data.topic);
    if (data.description) formData.append("description", data.description);
    if (data.date) formData.append("date", data.date);
    if (data.status) formData.append("status", data.status);

    // Handle image (new upload or existing)
    if (data.image instanceof File) {
      formData.append("image", data.image); // new image
    } else if (data.image) {
      formData.append("existingImage", data.image); // existing image
    }

    const response = await axios.put(
      `${backendUrl}/health/editHealth/${id}`,
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
    console.error("Error updating health news:", error);
    throw error;
  }
};

// ✅ Delete health news
export const deleteHealth = async (id, token) => {
  return axios.delete(`${backendUrl}/health/deleteHealth/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all health news
export const getAllHealth = async () => {
  return axios.get(`${backendUrl}/health/getHealth`);
};

// ✅ Get single health news by ID
export const getHealthById = async (id) => {
  const response = await axios.get(`${backendUrl}/health/${id}`);
  return response.data;
};
