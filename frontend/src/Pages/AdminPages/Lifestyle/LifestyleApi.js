import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add lifestyle post
export const addLifestyle = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("status", data.status || "active");
  form.append("date", data.date);

  // Images
  if (data.images && data.images.length > 0) {
    data.images.forEach((img) => form.append("image", img));
  }

  // Videos
  if (data.videos && data.videos.length > 0) {
    data.videos.forEach((vid) => form.append("video", vid));
  }

  return axios.post(`${backendUrl}/lifestyle/addLifestyle`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit lifestyle post
export const editLifestyle = async (id, data, token) => {
  try {
    const formData = new FormData();

    if (data.topic) formData.append("topic", data.topic);
    if (data.description) formData.append("description", data.description);
    if (data.status) formData.append("status", data.status);
    if (data.date) formData.append("date", data.date);

    // Handle images
    if (data.images && data.images.length > 0) {
      data.images.forEach((img) => {
        if (img instanceof File) {
          formData.append("image", img);
        } else {
          formData.append("existingImages", img); // keep existing
        }
      });
    }

    // Handle videos
    if (data.videos && data.videos.length > 0) {
      data.videos.forEach((vid) => {
        if (vid instanceof File) {
          formData.append("video", vid);
        } else {
          formData.append("existingVideos", vid); // keep existing
        }
      });
    }

    const response = await axios.put(
      `${backendUrl}/lifestyle/editLifestyle/${id}`,
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
    console.error("Error updating lifestyle post:", error);
    throw error;
  }
};

// ✅ Delete lifestyle post
export const deleteLifestyle = async (id, token) => {
  return axios.delete(`${backendUrl}/lifestyle/deleteLifestyle/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all lifestyle posts
export const getAllLifestyles = async () => {
  return axios.get(`${backendUrl}/lifestyle/getLifestyle`);
};

// ✅ Get single lifestyle post
export const getLifestyleById = async (id) => {
  const response = await axios.get(`${backendUrl}/lifestyle/${id}`);
  return response.data;
};
