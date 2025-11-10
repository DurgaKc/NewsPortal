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
import { addLocalGovernment } from "./LocalGovernmentApi"; // Corrected API import

const AddLocalGovernment = ({ onClose }) => {
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

      await addLocalGovernment(formData, token); // Use correct API function

      toast.success("Local Government news added successfully!");
      setFormData({
        topic: "",
        description: "",
        date: "",
        image: null,
        status: "active",
      });
      setPreview(null);
      onClose && onClose();
      navigate("/admin/local-government");
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
        sx={{ textAlign: "center", fontWeight: "bold", mt: 6, mb: 4 }}
      >
        Add Local Government News
      </Typography>

      <Paper
        elevation={3}
        sx={{ maxWidth: 800, mx: "auto", p: 4, borderRadius: 3 }}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 3,
                  mt: 4,
                }}
              >
                <Button
                  variant="contained"
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
                  variant="contained"
                  onClick={() => navigate("/admin/local-government")}
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

export default AddLocalGovernment;
