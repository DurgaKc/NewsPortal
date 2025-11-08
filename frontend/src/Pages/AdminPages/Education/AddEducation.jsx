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
import { addEducation } from "./EducationApi";

const AddEducationNews = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    image: null,
    status: "active",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to add news");
        setLoading(false);
        return;
      }

      await addEducation(formData, token);

      toast.success("Education news added successfully!");
      setFormData({
        topic: "",
        description: "",
        date: "",
        image: null,
        status: "active",
      });
      setPreview(null);
      onClose && onClose();
      navigate("/admin/education");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add news");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid>
      <Typography
        variant="h4"
        gutterBottom
        className="text-center font-semibold my-8 text-gray-800 pt-12"
      >
        Add Education News
      </Typography>

      <Paper
        elevation={3}
        sx={{ maxWidth: 800, mx: "auto", p: 4, my: 4, borderRadius: 3 }}
        className="bg-gradient-to-br from-sky-50 to-blue-100 dark:from-gray-800 dark:to-sky-900"
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Topic */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="News Topic"
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
                    backgroundColor: "#2B6EB5",
                    "&:hover": { backgroundColor: "#1e5b9c" },
                  }}
                >
                  {loading ? "Adding..." : "Add News"}
                </Button>

                <Button
                  variant="outlined"
                  onClick={() => navigate("/admin/education")}
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
    </Grid>
  );
};

export default AddEducationNews;
