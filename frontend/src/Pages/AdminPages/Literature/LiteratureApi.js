import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add literature
export const addLiterature = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  if (data.author) form.append("author", data.author); // optional
  form.append("category", data.category); // required
  form.append("description", data.description);
  form.append("date", data.date || new Date().toISOString());
  form.append("status", data.status || "active");
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/literature/addLiterature`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit literature
export const updateLiterature = async (id, data, token) => {
  try {
    const formData = new FormData();

    if (data.topic) formData.append("topic", data.topic);
    if (data.author) formData.append("author", data.author);
    if (data.category) formData.append("category", data.category);
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
      `${backendUrl}/literature/editLiterature/${id}`,
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
    console.error("Error updating literature:", error);
    throw error;
  }
};

// ✅ Delete literature
export const deleteLiterature = async (id, token) => {
  return axios.delete(`${backendUrl}/literature/deleteLiterature/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all literature
export const getAllLiterature = async () => {
  return axios.get(`${backendUrl}/literature/getLiterature`);
};

// ✅ Get single literature by ID
export const getLiteratureById = async (id) => {
  const response = await axios.get(`${backendUrl}/literature/${id}`);
  return response.data;
};

// ✅ Get categories (for dropdown/filter)
export const getCategories = async () => {
  const response = await axios.get(`${backendUrl}/literature/categories`);
  return response.data;
};