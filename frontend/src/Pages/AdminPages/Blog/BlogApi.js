import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add Blog
export const addBlog = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.video) form.append("video", data.video); // upload video

  return axios.post(`${backendUrl}/blog/addBlog`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Update Blog
export const updateBlog = async (id, data, token) => {
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
      `${backendUrl}/blog/editBlog/${id}`,
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
    console.error("Error updating blog:", error);
    throw error;
  }
};

// ✅ Delete Blog
export const deleteBlog = async (id, token) => {
  return axios.delete(`${backendUrl}/blog/deleteBlog/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all Blogs
export const getAllBlog = async () => {
  return axios.get(`${backendUrl}/blog/getBlog`);
};

// ✅ Get single Blog by ID
export const getBlogById = async (id) => {
  const response = await axios.get(`${backendUrl}/blog/${id}`);
  return response.data;
};
