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
import { addEntertainment } from "./EntertainmentApi";

const AddEntertainment = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    image: null,
    status: "active",
  });

  // PREVIEW MUST BE ARRAY
  const [preview, setPreview] = useState([]);

  const [loading, setLoading] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload (single)
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setFormData((prev) => ({ ...prev, image: files[0] }));

    // Preview as array
    setPreview(files.map((file) => URL.createObjectURL(file)));
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setPreview([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      await addEntertainment(formData, token);

      toast.success("Entertainment post added successfully!");

      setFormData({
        topic: "",
        description: "",
        date: "",
        image: null,
        status: "active",
      });

      setPreview([]);

      onClose && onClose();
      navigate("/admin/entertainment");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to add entertainment post");
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
        Add Entertainment Post
      </Typography>

      <Paper elevation={3} sx={{ maxWidth: 800, mx: "auto", p: 4, mb: 4, borderRadius: 3 }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>

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

            {/* Upload Image */}
            <Grid item  xs={12} sm={6}>
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

              {/* Image Preview */}
              <Box mt={2} display="flex" gap={2} flexWrap="wrap">
                {preview.map((src, index) => (
                  <Box
                    key={index}
                    position="relative"
                    sx={{
                      width: 140,
                      height: 140,
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
                        zIndex: 5,
                      }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>

                    <img
                      src={src}
                      alt="Preview"
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                ))}
              </Box>
            </Grid>

            {/* Status */}
            <Grid item  xs={12} sm={6}>
              <FormControl>
                <FormLabel>Status</FormLabel>
                <RadioGroup row name="status" value={formData.status} onChange={handleChange}>
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
              <Box display="flex" justifyContent="center" gap={4} mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={loading}
                  startIcon={loading && <CircularProgress size={20} />}
                >
                  {loading ? "Adding..." : "Add Entertainment"}
                </Button>

                <Button
                  variant="contained"
                  onClick={() => navigate("/admin/entertainment")}
                  sx={{
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

export default AddEntertainment;
