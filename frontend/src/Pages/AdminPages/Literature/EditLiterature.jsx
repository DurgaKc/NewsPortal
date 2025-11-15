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
  MenuItem,
  Select,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getLiteratureById, updateLiterature } from "./LiteratureApi";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditLiterature = ({ onClose, id }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    author: "",
    category: "Poem",
    description: "",
    date: "",
    image: null,
    status: "active",
  });

  // ✅ Fetch literature by id
  const { data: fetchedData, isLoading, refetch } = useQuery({
    queryKey: ["literature", id],
    queryFn: async () => getLiteratureById(id),
    enabled: !!id,
  });

  // ✅ Prefill form data once fetched
  useEffect(() => {
    if (fetchedData) {
      setFormData({
        topic: fetchedData.topic || "",
        author: fetchedData.author || "",
        category: fetchedData.category || "Poem",
        description: fetchedData.description || "",
        date: fetchedData.date ? fetchedData.date.split("T")[0] : "",
        image: fetchedData.image || null,
        status: fetchedData.status || "active",
      });

      if (fetchedData.image) {
        setPreview(`${backendUrl}/images/${fetchedData.image}`);
      }
    }
  }, [fetchedData]);

  // ✅ Mutation for updating literature
  const updateLiteratureMutation = useMutation({
    mutationFn: (updatedData) => {
      const token = localStorage.getItem("token");
      return updateLiterature(id, updatedData, token);
    },
    onSuccess: () => {
      toast.success("Literature updated successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update literature.");
    },
  });

  // ✅ Handle text/select/radio changes
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
    updateLiteratureMutation.mutate(formData);
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Loading literature...
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
          Edit Literature
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
                  label="Author"
                  value={formData.author}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              {/* Category */}
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    label="Category"
                    required
                  >
                    <MenuItem value="Poem">Poem</MenuItem>
                    <MenuItem value="Story">Story</MenuItem>
                    <MenuItem value="Ghazal">Ghazal</MenuItem>
                    <MenuItem value="muktak">मुक्तक</MenuItem>
                  </Select>
                </FormControl>
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
                      style={{ width: "100%", height: "auto", display: "block" }}
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
                    {loading ? "Updating..." : "Update Literature"}
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

export default EditLiterature;
