import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add province
export const addProvince = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/province/addProvince`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit province
export const updateProvince = async (id, data, token) => {
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
      `${backendUrl}/province/editProvince/${id}`,
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
    console.error("Error updating province:", error);
    throw error;
  }
};

// ✅ Delete province
export const deleteProvince = async (id, token) => {
  return axios.delete(`${backendUrl}/province/deleteProvince/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all provinces
export const getAllProvinces = async () => {
  return axios.get(`${backendUrl}/province/getProvinces`);
};

// ✅ Get single province
export const getProvinceById = async (id) => {
  const response = await axios.get(`${backendUrl}/province/${id}`);
  return response.data;
};
