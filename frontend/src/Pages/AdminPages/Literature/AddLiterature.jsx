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
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addLiterature } from "./LiteratureApi";

const AddLiterature = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    author: "",
    category: "Poem",
    description: "",
    date: new Date().toISOString().split("T")[0], // default today
    image: null,
    status: "active",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload & preview
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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in");
        setLoading(false);
        return;
      }

      await addLiterature(formData, token);
      toast.success("Literature added successfully!");

      // Reset form
      setFormData({
        topic: "",
        author: "",
        category: "Poem",
        description: "",
        date: new Date().toISOString().split("T")[0],
        image: null,
        status: "active",
      });
      setPreview(null);

      onClose && onClose();
      navigate("/admin/literature");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add literature");
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
        Add Literature
      </Typography>

      <Paper
        elevation={3}
        sx={{ maxWidth: 800, mx: "auto", p: 4, my: 4, borderRadius: 3 }}
        className="bg-gradient-to-br from-blue-50 to-purple-100"
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

            {/* Author */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                size="small"
              />
            </Grid>

            {/* Category Dropdown */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                size="small"
                required
              >
                <MenuItem value="Poem">कविता</MenuItem>
                <MenuItem value="Story">कथा</MenuItem>
                <MenuItem value="Ghazal">गजल</MenuItem>
                <MenuItem value="Muktak">मुक्तक</MenuItem>
              </TextField>
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
                    style={{ width: "100%", height: "auto" }}
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
                  <FormControlLabel value="active" control={<Radio />} label="Active" />
                  <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
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
                  {loading ? "Adding..." : "Add Literature"}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/admin/literature")}
                  sx={{
                    textTransform: "none",
                    px: 4,
                    borderRadius: 2,
                    backgroundColor: "#d32f2f",
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

export default AddLiterature;
