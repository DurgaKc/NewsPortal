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
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getEntertainmentById, editEntertainment } from "./EntertainmentApi";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditEntertainment = ({ onClose, id }) => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    image: null,
    status: "active",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch entertainment post
  const { data: fetchedPost, isLoading, refetch } = useQuery({
    queryKey: ["entertainment", id],
    queryFn: () => getEntertainmentById(id),
    enabled: !!id,
  });

  // ✅ Prefill form when data arrives
  useEffect(() => {
    if (fetchedPost) {
      setFormData({
        topic: fetchedPost.topic || "",
        description: fetchedPost.description || "",
        date: fetchedPost.date ? fetchedPost.date.split("T")[0] : "",
        image: fetchedPost.image || null,
        status: fetchedPost.status || "active",
      });

      if (fetchedPost.image) {
        setPreview(`${backendUrl}/images/${fetchedPost.image}`);
      }
    }
  }, [fetchedPost]);

  // ✅ Update mutation
  const updateEntertainment = useMutation({
    mutationFn: () => {
      const token = localStorage.getItem("token");
      return editEntertainment(id, formData, token);
    },
    onSuccess: () => {
      toast.success("Entertainment post updated successfully!");
      refetch();
      onClose && onClose();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to update post.");
    },
  });

  // Handle field changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
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

  // Handle submit
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateEntertainment.mutate();
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        Loading entertainment post...
      </Typography>
    );
  }

  return (
    <Grid>
      <DialogContent>
        <Typography variant="h4" sx={{ mt: 4, mb: 4, textAlign: "center" }}>
          Edit Entertainment Post
        </Typography>

        <Paper
          elevation={3}
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
                  type="date"
                  name="date"
                  label="Date"
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
                  name="image"
                  size="small"
                  fullWidth
                  onChange={handleImageChange}
                  accept="image/*"
                  label="Upload Image"
                  InputLabelProps={{ shrink: true }}
                />

                {preview && (
                  <Box
                    mt={1}
                    position="relative"
                    sx={{
                      width: "100%",
                      maxHeight: 160,
                      borderRadius: 2,
                      overflow: "hidden",
                      boxShadow: 2,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={removeImage}
                      sx={{
                        position: "absolute",
                        right: 4,
                        top: 4,
                        background: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    <img
                      src={preview}
                      alt="Preview"
                      style={{ width: "100%", display: "block" }}
                    />
                  </Box>
                )}
              </Grid>

              {/* Status */}
              <Grid item xs={12} sm={6}>
                <FormControl>
                  <FormLabel>Status</FormLabel>
                  <RadioGroup
                    row
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <FormControlLabel
                      value="active"
                      control={<Radio />}
                      label="Active"
                    />
                    <FormControlLabel
                      value="inactive"
                      control={<Radio />}
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
                <Box display="flex" justifyContent="center" gap={4} mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                    sx={{ px: 4, borderRadius: 2 }}
                  >
                    {loading ? "Updating..." : "Update Post"}
                  </Button>

                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onClose && onClose()}
                    sx={{ px: 4, borderRadius: 2 }}
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

export default EditEntertainment;
