import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add politics news
export const addPolitics = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/politics/addPolitics`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit politics news
export const updatePolitics = async (id, data, token) => {
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
      `${backendUrl}/politics/editPolitics/${id}`,
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
    console.error("Error updating politics news:", error);
    throw error;
  }
};

// ✅ Delete politics news
export const deletePolitics = async (id, token) => {
  return axios.delete(`${backendUrl}/politics/deletePolitics/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all politics news
export const getAllPolitics = async () => {
  return axios.get(`${backendUrl}/politics/getPolitics`);
};

// ✅ Get single politics news
export const getPoliticsById = async (id) => {
  const response = await axios.get(`${backendUrl}/politics/${id}`);
  return response.data;
};
