import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add Local Government news
export const addLocalGovernment = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/local/addLocalGovernment`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit Local Government news
export const updateLocalGovernment = async (id, updatedData, token) => {
  const formData = new FormData();
  Object.entries(updatedData).forEach(([key, value]) => {
    formData.append(key, value);
  });
  return axios.put(`${backendUrl}/local/editLocalGovernment/${id}`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Delete Local Government news
export const deleteLocalGovernment = async (id, token) => {
  return axios.delete(`${backendUrl}/local/deleteLocalGovernment/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all Local Government news
export const getAllLocalGovernment = async () => {
  return axios.get(`${backendUrl}/local/getLocalGovernments`);
};

// ✅ Get single Local Government news by ID
export const getLocalGovernmentById = async (id) => {
  const res = await axios.get(`${backendUrl}/local/${id}`);
  return res.data;
};
