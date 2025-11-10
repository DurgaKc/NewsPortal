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
import { getEntertainmentById, editEntertainment } from "./EntertainmentApi";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditEntertainment = ({ onClose, id }) => {
  const [mediaPreviews, setMediaPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    media: [],
    status: "active",
  });

  // ✅ Fetch entertainment post by id
  const { data: fetchedPost, isLoading, refetch } = useQuery({
    queryKey: ["entertainment", id],
    queryFn: async () => await getEntertainmentById(id),
    enabled: !!id,
  });

  // ✅ Prefill form data
  useEffect(() => {
    if (fetchedPost) {
      const imagePreviews =
        fetchedPost.images?.map((img) => ({
          type: "image",
          url: `${backendUrl}/images/${img}`,
        })) || [];

      const videoPreviews =
        fetchedPost.videos?.map((vid) => ({
          type: "video",
          url: `${backendUrl}/videos/${vid}`,
        })) || [];

      setFormData({
        topic: fetchedPost.topic || "",
        description: fetchedPost.description || "",
        date: fetchedPost.date ? fetchedPost.date.split("T")[0] : "",
        media: [...(fetchedPost.images || []), ...(fetchedPost.videos || [])],
        status: fetchedPost.status || "active",
      });

      setMediaPreviews([...imagePreviews, ...videoPreviews]);
    }
  }, [fetchedPost]);

  // ✅ Mutation for updating entertainment post
  const updateEntertainment = useMutation({
    mutationFn: (updatedPost) => {
      const token = localStorage.getItem("token");
      return editEntertainment(id, updatedPost, token);
    },
    onSuccess: () => {
      toast.success("Entertainment post updated successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update post.");
    },
  });

  // ✅ Handle text changes
  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle combined media upload
  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, media: files }));

    const previews = files.map((file) => ({
      type: file.type.startsWith("image") ? "image" : "video",
      url: URL.createObjectURL(file),
    }));

    setMediaPreviews(previews);
  };

  // ✅ Remove individual preview
  const removeMedia = (index) => {
    const updatedMedia = [...formData.media];
    updatedMedia.splice(index, 1);
    setFormData((prev) => ({ ...prev, media: updatedMedia }));

    const updatedPreviews = [...mediaPreviews];
    updatedPreviews.splice(index, 1);
    setMediaPreviews(updatedPreviews);
  };

  // ✅ Handle form submit
  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateEntertainment.mutate(formData);
    setLoading(false);
  };

  if (isLoading) {
    return (
      <Typography variant="h6" sx={{ textAlign: "center", mt: 4 }}>
        Loading entertainment post...
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
          Edit Entertainment Post
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

              {/* Media (Left) and Status (Right) */}
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
                  multiple
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

              {/* Status (Right Side) */}
              <Grid item xs={12} sm={6}>
                <FormControl component="fieldset" fullWidth>
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
                      backgroundColor: "#1976d2",
                      color: "white",
                      "&:hover": { backgroundColor: "#115293" },
                    }}
                  >
                    {loading ? "Updating..." : "Update Post"}
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

export default EditEntertainment;
