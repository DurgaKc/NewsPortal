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
import { editLifestyle, getLifestyleById } from "./LifestyleApi";
import toast from "react-hot-toast";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const EditLifestyle = ({ onClose, id }) => {
  const [existingMedia, setExistingMedia] = useState([]); // {url, type, isNew, file?}
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    topic: "",
    description: "",
    date: "",
    status: "active",
  });

  // Fetch lifestyle post by id
  const { data: fetchedPost, isLoading, refetch } = useQuery({
    queryKey: ["lifestyle", id],
    queryFn: async () => await getLifestyleById(id),
    enabled: !!id,
  });

  // Prefill form data and media
  useEffect(() => {
    if (fetchedPost) {
      setFormData({
        topic: fetchedPost.topic || "",
        description: fetchedPost.description || "",
        date: fetchedPost.date ? fetchedPost.date.split("T")[0] : "",
        status: fetchedPost.status || "active",
      });

      const combinedMedia = [
        ...(fetchedPost.images || []).map((img) => ({ url: `${backendUrl}/images/${img}`, type: "image", isNew: false })),
        ...(fetchedPost.videos || []).map((vid) => ({ url: `${backendUrl}/videos/${vid}`, type: "video", isNew: false })),
      ];
      setExistingMedia(combinedMedia);
    }
  }, [fetchedPost]);

  const updateLifestyleMutation = useMutation({
    mutationFn: (updatedPost) => {
      const token = localStorage.getItem("token");
      return editLifestyle(id, updatedPost, token);
    },
    onSuccess: () => {
      toast.success("Lifestyle post updated successfully!");
      refetch();
      onClose();
    },
    onError: (error) => {
      console.error(error);
      toast.error(error.response?.data?.error || "Failed to update post.");
    },
  });

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (e) => {
    const files = Array.from(e.target.files);
    const newMedia = files.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
      isNew: true,
      file,
    }));
    setExistingMedia((prev) => [...prev, ...newMedia]);
  };

  const removeMedia = (index) => {
    setExistingMedia((prev) => prev.filter((_, i) => i !== index));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setLoading(true);

    const images = existingMedia.filter((m) => m.type === "image" && m.isNew).map((m) => m.file);
    const videos = existingMedia.filter((m) => m.type === "video" && m.isNew).map((m) => m.file);
    const existingImages = existingMedia.filter((m) => m.type === "image" && !m.isNew).map((m) => m.url.split("/").pop());
    const existingVideos = existingMedia.filter((m) => m.type === "video" && !m.isNew).map((m) => m.url.split("/").pop());

    const payload = {
      ...formData,
      images,
      videos,
      existingImages,
      existingVideos,
    };

    updateLifestyleMutation.mutate(payload);
    setLoading(false);
  };

  if (isLoading) {
    return <Typography sx={{ textAlign: "center", mt: 4 }}>Loading lifestyle post...</Typography>;
  }

  return (
    <Grid>
      <DialogContent>
        <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 4, textAlign: "center" }}>
          Edit Lifestyle Post
        </Typography>

        <Paper elevation={2} sx={{ maxWidth: 800, mx: "auto", p: 3, borderRadius: 2 }}>
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

              {/* Status (left) and Media Upload (right) */}
              <Grid item xs={12} sm={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Status</FormLabel>
                  <RadioGroup row name="status" value={formData.status} onChange={handleChange}>
                    <FormControlLabel value="active" control={<Radio color="primary" />} label="Active" />
                    <FormControlLabel value="inactive" control={<Radio color="primary" />} label="Inactive" />
                  </RadioGroup>
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={9}>
                <TextField
                  type="file"
                  size="small"
                  label="Upload Images/Videos"
                  onChange={handleMediaChange}
                  accept="image/*,video/*"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  multiple
                />
                <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
                  {existingMedia.map((media, index) => (
                    <Box key={index} position="relative" width={media.type === "video" ? 150 : 100}>
                      <IconButton
                        size="small"
                        onClick={() => removeMedia(index)}
                        sx={{ position: "absolute", top: 0, right: 0, background: "rgba(255,255,255,0.8)" }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      {media.type === "image" ? (
                        <img src={media.url} alt="Media" style={{ width: "100%", display: "block" }} />
                      ) : (
                        <video src={media.url} controls style={{ width: "100%", display: "block" }} />
                      )}
                    </Box>
                  ))}
                </Box>
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
                    sx={{ textTransform: "none", px: 4, borderRadius: 2, backgroundColor: "#1976d2", color: "white", "&:hover": { backgroundColor: "#115293" } }}
                  >
                    {loading ? "Updating..." : "Update Post"}
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => onClose && onClose(null)}
                    sx={{ textTransform: "none", px: 4, borderRadius: 2, backgroundColor: "#d32f2f", color: "white", "&:hover": { backgroundColor: "#b71c1c" } }}
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

export default EditLifestyle;
