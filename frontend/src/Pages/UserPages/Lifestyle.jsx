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
import toast from "react-hot-toast";
import { editLifestyle, getLifestyleById } from "../AdminPages/Lifestyle/LifestyleApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditLifestyle = ({ onClose, id }) => {
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    image: null,
    status: "active",
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch data
  const { data: fetchedPost, isLoading } = useQuery({
    queryKey: ["lifestyle", id],
    queryFn: () => getLifestyleById(id),
    enabled: !!id,
  });

  // Prefill data
  useEffect(() => {
    if (fetchedPost) {
      setFormData({
        topic: fetchedPost.topic,
        description: fetchedPost.description,
        date: fetchedPost.date?.split("T")[0],
        image: fetchedPost.image,
        status: fetchedPost.status,
      });

      if (fetchedPost.image) {
        setPreview(`${backendUrl}/images/${fetchedPost.image}`);
      }
    }
  }, [fetchedPost]);

  // Mutation
  const mutation = useMutation({
    mutationFn: async (data) => {
      const token = localStorage.getItem("token");
      return await editLifestyle(id, data, token);
    },
    onSuccess: () => {
      toast.success("Lifestyle updated successfully!");
      onClose && onClose();
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to update lifestyle.");
    },
  });

  // Handle text inputs
  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  // Handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((p) => ({ ...p, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setFormData((p) => ({ ...p, image: null }));
    setPreview(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    mutation.mutate(formData, {
      onSettled: () => setLoading(false),
    });
  };

  if (isLoading) {
    return <Typography textAlign="center">Loading...</Typography>;
  }

  return (
    <Grid>
      <DialogContent>
        <Typography variant="h4" textAlign="center" sx={{ mb: 3 }}>
          Edit Lifestyle Post
        </Typography>

        <Paper sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
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
                />
              </Grid>

              {/* Image */}
              <Grid item xs={12} sm={6}>
                <TextField
                  type="file"
                  fullWidth
                  size="small"
                  name="image"
                  onChange={handleImageChange}
                  InputLabelProps={{ shrink: true }}
                />

                {preview && (
                  <Box mt={1} position="relative">
                    <IconButton
                      size="small"
                      onClick={removeImage}
                      sx={{ position: "absolute", top: 4, right: 4 }}
                    >
                      <CloseIcon />
                    </IconButton>
                    <img
                      src={preview}
                      alt="preview"
                      style={{ width: "100%", borderRadius: 8 }}
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
                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                    <FormControlLabel value="inactive" control={<Radio />} label="Inactive" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Description */}
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  size="small"
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12}>
                <Box display="flex" justifyContent="center" gap={3}>
                  <Button
                    variant="contained"
                    type="submit"
                    disabled={loading}
                    startIcon={loading && <CircularProgress size={20} />}
                  >
                    {loading ? "Updating..." : "Update"}
                  </Button>

                  <Button variant="contained" color="error" onClick={() => onClose()}>
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

export default EditLifestyle;
