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
import { getLatestNewsById, updateLatestNews } from "./LatestNewsApi";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditLatestNews = ({ onClose, id }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    topic: "",
    author: "", // Added author field
    description: "",
    date: "",
    image: null,
    status: "active",
  });

  // ✅ Fetch latest news by ID
  const { data: fetchedNews, isLoading } = useQuery({
    queryKey: ["latest-news", id],
    queryFn: async () => {
      const res = await getLatestNewsById(id);
      return res;
    },
    enabled: !!id,
  });

  // ✅ Prefill form when data arrives
  useEffect(() => {
    if (fetchedNews) {
      setFormData({
        topic: fetchedNews.topic || "",
        author: fetchedNews.author || "", // Added author field
        description: fetchedNews.description || "",
        date: fetchedNews.date ? fetchedNews.date.split("T")[0] : "",
        image: fetchedNews.image || null,
        status: fetchedNews.status || "active",
      });

      if (fetchedNews.image) {
        setPreview(`${backendUrl}/images/${fetchedNews.image}`);
      }
    }
  }, [fetchedNews]);

  // ✅ Update latest news mutation
  const updateMutation = useMutation({
    mutationFn: (payload) => {
      const token = localStorage.getItem("token");
      return updateLatestNews(id, payload, token);
    },
    onSuccess: () => {
      toast.success("Latest News updated successfully!");
      onClose();
    },
    onError: (err) => {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update news");
    },
  });

  // Change inputs
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Upload image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove image
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  // Submit update
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateMutation.mutate(formData);
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Loading news data...
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
          Edit Latest News
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

              {/* Author */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="author"
                  label="Author Name"
                  value={formData.author}
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
                  <FormLabel>Status</FormLabel>
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
                <Box className="flex justify-center gap-4 mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={loading}
                    sx={{
                      textTransform: "none",
                      px: 4,
                      borderRadius: 2,
                      backgroundColor: "#1976d2",
                      color: "white",
                      "&:hover": { backgroundColor: "#115293" },
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
                      backgroundColor: "#d32f2f",
                      color: "white",
                      "&:hover": { backgroundColor: "#b71c1c" },
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

export default EditLatestNews;