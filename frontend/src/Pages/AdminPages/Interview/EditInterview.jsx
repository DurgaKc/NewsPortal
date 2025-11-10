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
import { getInterviewById, updateInterview } from "./InterviewApi";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditInterview = ({ onClose, id }) => {
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    video: null,
    status: "active",
  });

  // Fetch interview by ID
  const {
    data: fetchedInterview,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["interview", id],
    queryFn: async () => {
      const res = await getInterviewById(id);
      return res;
    },
    enabled: !!id,
  });

  // Prefill form data once fetched
  useEffect(() => {
    if (fetchedInterview) {
      setFormData({
        topic: fetchedInterview.topic || "",
        description: fetchedInterview.description || "",
        date: fetchedInterview.date ? fetchedInterview.date.split("T")[0] : "",
        video: fetchedInterview.video || null,
        status: fetchedInterview.status || "active",
      });

      // Show video preview if exists
      if (fetchedInterview.video) {
        setPreview(`${backendUrl}/videos/${fetchedInterview.video}`);
      }
    }
  }, [fetchedInterview]);

  // Mutation for updating interview
  const updateInterviewData = useMutation({
    mutationFn: (updatedData) => {
      const token = localStorage.getItem("token");
      return updateInterview(id, updatedData, token);
    },
    onSuccess: () => {
      toast.success("Interview updated successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update interview.");
    },
  });

  // Handle input changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle video upload
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, video: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  // Remove uploaded video
  const removeVideo = () => {
    setFormData((prev) => ({ ...prev, video: null }));
    setPreview(null);
  };

  // Handle form submission
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateInterviewData.mutate(formData);
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Loading interview...
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
          Edit Interview
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

              {/* Video Upload */}
              <Grid item xs={12}>
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
                    sx={{ width: "100%", borderRadius: 2, boxShadow: 1 }}
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
                      style={{
                        width: "100%",
                        height: "auto",
                        display: "block",
                        borderRadius: 8,
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
                    {loading ? "Updating..." : "Update Interview"}
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => onClose && onClose(null)}
                    sx={{
                      textTransform: "none",
                      px: 4,
                      borderRadius: 2,
                      color: "white",
                      backgroundColor: "#d32f2f",
                      "&:hover": {
                        backgroundColor: "#b71c1c", // Darker blue on hover
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
      </DialogContent>
    </Grid>
  );
};

export default EditInterview;
