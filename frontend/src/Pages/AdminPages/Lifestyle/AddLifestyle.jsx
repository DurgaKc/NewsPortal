import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  IconButton,
  Radio,
  RadioGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addLifestyle } from "./LifestyleApi"; // Make sure this API exists

const AddLifestyle = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    media: [], // combined field for images and videos
    status: "active",
  });

  const [mediaPreviews, setMediaPreviews] = useState([]); // preview for both
  const [loading, setLoading] = useState(false);

  // Handle text/radio changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image/video file selection
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length) {
      setFormData((prev) => ({ ...prev, media: files }));
      setMediaPreviews(
        files.map((file) => ({
          url: URL.createObjectURL(file),
          type: file.type.startsWith("image") ? "image" : "video",
        }))
      );
    }
  };

  const removeMedia = (index) => {
    setFormData((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index),
    }));
    setMediaPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add lifestyle post");
        setLoading(false);
        return;
      }

      await addLifestyle(formData, token);

      toast.success("Lifestyle post added successfully!");
      setFormData({
        topic: "",
        description: "",
        date: "",
        media: [],
        status: "active",
      });
      setMediaPreviews([]);
      onClose && onClose();
      navigate("/admin/lifestyle");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add lifestyle post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid>
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", mt: 8, mb: 4, fontWeight: "bold" }}
      >
        Add Lifestyle Post
      </Typography>

      <Paper
        elevation={3}
        sx={{ maxWidth: 800, mx: "auto", p: 4, mb: 4, borderRadius: 3 }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Topic */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Topic"
                name="topic"
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
                label="Date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                size="small"
                required
              />
            </Grid>

            {/* Media Upload */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="file"
                size="small"
                name="media"
                onChange={handleMediaChange}
                accept="image/*,video/*"
                label="Upload Images or Videos"
                InputLabelProps={{ shrink: true }}
                fullWidth
                inputProps={{ multiple: true }}
              />

              <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                {mediaPreviews.map((file, index) => (
                  <Box
                    key={index}
                    position="relative"
                    width={file.type === "video" ? 150 : 100}
                  >
                    <IconButton
                      size="small"
                      onClick={() => removeMedia(index)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        background: "rgba(255,255,255,0.8)",
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                    {file.type === "image" ? (
                      <img
                        src={file.url}
                        alt="preview"
                        style={{
                          width: "100%",
                          height: "auto",
                          display: "block",
                        }}
                      />
                    ) : (
                      <video
                        src={file.url}
                        controls
                        style={{ width: "100%", display: "block" }}
                      />
                    )}
                  </Box>
                ))}
              </Box>
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
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={5}
                size="small"
                required
              />
            </Grid>

            {/* Buttons */}
            <Grid item xs={12}>
              <Box display="flex" justifyContent="center" gap={4} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                  sx={{
                    textTransform: "none",
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 600,
                    backgroundColor: "#1976d2",
                    color: "white",
                    "&:hover": { backgroundColor: "#115293" },
                  }}
                >
                  {loading ? "Adding..." : "Add Lifestyle"}
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/admin/lifestyle")}
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
    </Grid>
  );
};

export default AddLifestyle;
