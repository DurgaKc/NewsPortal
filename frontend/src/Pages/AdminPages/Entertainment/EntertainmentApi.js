import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add entertainment post
export const addEntertainment = async (data, token) => {
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

  return axios.post(`${backendUrl}/entertainment/addEntertainment`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit entertainment post
export const editEntertainment = async (id, data, token) => {
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
          formData.append("existingImages", img);
        }
      });
    }

    // Handle videos
    if (data.videos && data.videos.length > 0) {
      data.videos.forEach((vid) => {
        if (vid instanceof File) {
          formData.append("video", vid);
        } else {
          formData.append("existingVideos", vid);
        }
      });
    }

    const response = await axios.put(
      `${backendUrl}/entertainment/editEntertainment/${id}`,
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
    console.error("Error updating entertainment post:", error);
    throw error;
  }
};

// ✅ Delete entertainment post
export const deleteEntertainment = async (id, token) => {
  return axios.delete(`${backendUrl}/entertainment/deleteEntertainment/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all entertainment posts
export const getAllEntertainment = async () => {
  return axios.get(`${backendUrl}/entertainment/getEntertainment`);
};

// ✅ Get single entertainment post
export const getEntertainmentById = async (id) => {
  const response = await axios.get(`${backendUrl}/entertainment/${id}`);
  return response.data;
};
