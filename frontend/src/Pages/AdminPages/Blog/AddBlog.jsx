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
import { addBlog } from "./BlogApi";

const AddBlog = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    status: "active",
    video: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, video: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeVideo = () => {
    setFormData((prev) => ({ ...prev, video: null }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add blog");
        setLoading(false);
        return;
      }

      await addBlog(formData, token);

      toast.success("Blog added successfully!");
      setFormData({
        topic: "",
        description: "",
        date: "",
        status: "active",
        video: null,
      });
      setPreview(null);
      onClose && onClose();
      navigate("/admin/blog");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add blog");
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
        Add Blog
      </Typography>

      <Paper
        elevation={3}
        sx={{ maxWidth: 800, mx: "auto", p: 4, my: 4, borderRadius: 3 }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* topic */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="topic"
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

            {/* Video Upload */}
            <Grid item xs={12} sm={6}>
              <TextField
                type="file"
                size="small"
                name="video"
                onChange={handleVideoChange}
                accept="video/*"
                label="Upload Video"
                InputLabelProps={{ shrink: true }}
                fullWidth
              />
              {preview && (
                <Box
                  mt={1}
                  position="relative"
                  sx={{
                    width: "100%",
                    maxHeight: 200,
                    borderRadius: 2,
                    overflow: "hidden",
                    boxShadow: 1,
                  }}
                >
                  <IconButton
                    size="small"
                    onClick={removeVideo}
                    sx={{
                      position: "absolute",
                      top: 4,
                      right: 4,
                      background: "rgba(255,255,255,0.8)",
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                  <video
                    src={preview}
                    controls
                    style={{ width: "100%", height: "auto", display: "block" }}
                  />
                </Box>
              )}
            </Grid>

            {/* Status Radio Buttons */}
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

            {/* description */}
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

            {/* Submit Buttons */}
            <Grid item xs={12}>
              <Box className="flex justify-center gap-4 mt-6">
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
                    backgroundColor: "#1976d2", // Blue
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#115293", // Darker blue on hover
                    },
                  }}
                >
                  {loading ? "Adding..." : "Add Blog"}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/admin/blog")}
                  sx={{
                    textTransform: "none",
                    px: 4,
                    borderRadius: 2,
                    backgroundColor: "#d32f2f", // red
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#b71c1c", // dark red on hover
                    },
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

export default AddBlog;
