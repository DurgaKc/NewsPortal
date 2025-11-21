import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add advertisement
export const addAdvertisement = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/advertisement/addAdvertisement`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit advertisement
export const updateAdvertisement = async (id, data, token) => {
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
      `${backendUrl}/advertisement/editAdvertisement/${id}`,
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
    console.error("Error updating advertisement:", error);
    throw error;
  }
};

// ✅ Delete advertisement
export const deleteAdvertisement = async (id, token) => {
  return axios.delete(`${backendUrl}/advertisement/deleteAdvertisement/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all advertisements
export const getAllAdvertisements = async () => {
  return axios.get(`${backendUrl}/advertisement/getAdvertisement`);
};

// ✅ Get single advertisement
export const getAdvertisementById = async (id) => {
  const response = await axios.get(`${backendUrl}/advertisement/${id}`);
  return response.data;
};

// ✅ Get all active popup advertisements
export const getPopupAdvertisements = async () => {
  const response = await axios.get(`${backendUrl}/advertisement/popups`);
  return response.data;
};
