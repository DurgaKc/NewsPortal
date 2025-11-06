import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add news
export const addNews = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/international/addInternational`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit news
export const updateNews = async (id, data, token) => {
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

    console.log("Form data being sent:", data);

    const response = await axios.put(
      `${backendUrl}/international/editInternational/${id}`,
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
    console.error("Error updating news:", error);
    throw error;
  }
  
};


// ✅ Delete news
export const deleteNews = async (id, token) => {
  return axios.delete(`${backendUrl}/international/deleteInternational/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all news
export const getAllNews = async () => {
  return axios.get(`${backendUrl}/international/getInternationals`);
};

// ✅ Get single news
export const getNewsById = async (id) => {
  const response = await axios.get(`${backendUrl}/international/${id}`);
  return response.data; 
};

