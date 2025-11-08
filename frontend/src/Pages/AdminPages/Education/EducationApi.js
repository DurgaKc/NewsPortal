import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Add education news
export const addEducation = async (data, token) => {
  const form = new FormData();
  form.append("topic", data.topic);
  form.append("description", data.description);
  form.append("date", data.date);
  form.append("status", data.status);
  if (data.image) form.append("image", data.image);

  return axios.post(`${backendUrl}/education/addEducation`, form, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

// ✅ Edit education news
export const updateEducation = async (id, data, token) => {
  const formData = new FormData();

  if (data.topic !== undefined) formData.append("topic", data.topic);
  if (data.description !== undefined) formData.append("description", data.description);
  if (data.date !== undefined) formData.append("date", data.date);
  if (data.status !== undefined) formData.append("status", data.status);

  // Handle image: new file or existing filename
  if (data.image instanceof File) {
    formData.append("image", data.image); // New image uploaded
  } else if (data.image) {
    // Optional: if backend expects "existingImage" to keep the old image
    formData.append("existingImage", data.image);
  }

  const response = await axios.put(
    `${backendUrl}/education/editEducation/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

// ✅ Delete education news
export const deleteEducation = async (id, token) => {
  return axios.delete(`${backendUrl}/education/deleteEducation/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// ✅ Get all education news
export const getAllEducation = async () => {
  const response = await axios.get(`${backendUrl}/education/getEducation`);
  return response.data;
};

// ✅ Get single education news
export const getEducationById = async (id) => {
  const response = await axios.get(`${backendUrl}/education/${id}`);
  return response.data;
};
