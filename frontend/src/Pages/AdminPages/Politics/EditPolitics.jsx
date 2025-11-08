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
import { getPoliticsById, updatePolitics } from "./PoliticsApi";
import toast from "react-hot-toast";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditPolitics = ({ onClose, id }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    image: null,
    status: "active",
  });

  // ✅ Fetch news by id
  const {
    data: fetchedNews,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["politics", id],
    queryFn: async () => {
      const res = await getPoliticsById(id);
      return res;
    },
    enabled: !!id,
  });

  // ✅ Prefill form data once fetched
  useEffect(() => {
    if (fetchedNews) {
      setFormData({
        topic: fetchedNews.topic || "",
        description: fetchedNews.description || "",
        date: fetchedNews.date ? fetchedNews.date.split("T")[0] : "",
        image: fetchedNews.image || null,
        status: fetchedNews.status || "active",
      });

      // ✅ show correct preview image
      if (fetchedNews.image) {
        setPreview(`${backendUrl}/images/${fetchedNews.image}`);
      }
    }
  }, [fetchedNews]);

  // ✅ Mutation for updating news
  const updatePoliticsNews = useMutation({
    mutationFn: (updatedNews) => {
      const token = localStorage.getItem("token");
      return updatePolitics(id, updatedNews, token);
    },
    onSuccess: () => {
      toast.success("Politics news updated successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update news.");
    },
  });

  // ✅ Handle text/radio changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Remove uploaded image
  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  // ✅ Handle form submission
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    updatePoliticsNews.mutate(formData);
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Loading politics news...
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
          Edit Politics News
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
                      fontWeight: 600,
                      backgroundColor: "#2B6EB5",
                      "&:hover": { backgroundColor: "#1e5b9c" },
                    }}
                  >
                    {loading ? "Updating..." : "Update News"}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => onClose && onClose(null)}
                    sx={{
                      textTransform: "none",
                      px: 4,
                      borderRadius: 2,
                      color: "#2B6EB5",
                      borderColor: "#2B6EB5",
                      "&:hover": { borderColor: "#1e5b9c" },
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

export default EditPolitics;
