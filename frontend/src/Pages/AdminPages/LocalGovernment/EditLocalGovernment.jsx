import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  DialogContent,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  getLocalGovernmentById,
  updateLocalGovernment,
} from "./LocalGovernmentApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditLocalGovernment = ({ onClose, id }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    image: null,
    status: "active",
  });

  // ✅ Fetch local government data by ID
  const {
    data: fetchedNews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["localGovernment", id],
    queryFn: async () => {
      const res = await getLocalGovernmentById(id);
      return res?.data || res; // ensure compatibility
    },
    enabled: !!id,
  });

  // ✅ Prefill data after fetch
  useEffect(() => {
    if (fetchedNews) {
      setFormData({
        topic: fetchedNews.topic || "",
        description: fetchedNews.description || "",
        date: fetchedNews.date ? fetchedNews.date.split("T")[0] : "",
        image: fetchedNews.image || null,
        status: fetchedNews.status || "active",
      });

      if (fetchedNews.image) {
        setPreview(`${backendUrl}/images/${fetchedNews.image}`);
      } else {
        setPreview(null);
      }
    }
  }, [fetchedNews]);

  // ✅ Mutation for update
  const updateLocalGov = useMutation({
    mutationFn: async (updatedData) => {
      const token = localStorage.getItem("token");
      return await updateLocalGovernment(id, updatedData, token);
    },
    onSuccess: () => {
      toast.success("Local Government news updated successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to update Local Government news."
      );
    },
  });

  // ✅ Handle field change
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Remove image
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  // ✅ Submit update
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateLocalGov.mutate(formData, {
      onSettled: () => setLoading(false),
    });
  };

  if (isLoading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Loading Local Government news...
      </Typography>
    );
  }

  return (
    <Grid>
      <DialogContent>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ mt: 4, mb: 4, textAlign: "center" }}
        >
          Edit Local Government News
        </Typography>

        <Paper
          elevation={2}
          sx={{ maxWidth: 700, mx: "auto", p: 3, borderRadius: 2 }}
        >
          <form onSubmit={handleEdit}>
            <Grid container spacing={2}>
              {/* Topic */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="topic"
                  label="Topic"
                  value={formData.topic}
                  onChange={handleChange}
                  size="small"
                  required
                />
              </Grid>

              {/* Date */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="date"
                  label="Date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                  size="small"
                  required
                />
              </Grid>

              {/* Image Upload */}
              <Grid item xs={12} sm={6}>
                <TextField
                  type="file"
                  size="small"
                  name="image"
                  onChange={handleImageChange}
                  accept="image/*"
                  label="Upload Image"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                />

                {preview && (
                  <Box
                    mt={1}
                    position="relative"
                    sx={{
                      width: "100%",
                      maxHeight: 150,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 1,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={removeImage}
                      sx={{
                        position: "absolute",
                        top: 4,
                        right: 4,
                        background: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    <img
                      src={preview}
                      alt="Preview"
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                      }}
                    />
                  </Box>
                )}
              </Grid>

              {/* Status */}
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup
                    row
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio color="primary" />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio color="primary" />}
                      label="Inactive"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="description"
                  label="Description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={4}
                  size="small"
                  required
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={2} mt={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    sx={{
                      textTransform: "none",
                      px: 4,
                      borderRadius: 2,
                      fontWeight: 600,
                      backgroundColor: "#2B6EB5",
                      "&:hover": { backgroundColor: "#1e5b9c" },
                    }}
                  >
                    {loading ? "Updating..." : "Update News"}
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => onClose && onClose(null)}
                    sx={{
                      textTransform: "none",
                      px: 4,
                      borderRadius: 2,
                      color: "white",
                      backgroundColor: "#d32f2f",
                      "&:hover": { borderColor: "#b71c1c" },
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </DialogContent>
    </Grid>
  );
};

export default EditLocalGovernment;
