import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import { getPopupAdvertisements } from "../AdminPages/Advertisement/AdvertisementApi";

const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) return `${diffInDays} days ago`;
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) return `${diffInMonths} months ago`;
  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};

const Advertisement= () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchAds = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getPopupAdvertisements();
        const adData = response.data;

        if (Array.isArray(adData)) {
          const formattedAds = adData
            .sort(
              (a, b) =>
                new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
            )
            .map((item) => ({
              id: item._id,
              topic: item.topic,
              description: item.description,
              media: item.image
                ? `${backendUrl}/images/${item.image}`
                : "/ad-placeholder.png",
              createdAt: item.date || item.createdAt,
            }));

          setAds(formattedAds);
        } else {
          setAds([]);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load advertisements. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAds();
  }, [backendUrl]);

  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-40">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading advertisements...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          variant="contained"
          sx={{ mt: 2, textTransform: "none" }}
          onClick={() => window.location.reload()}
        >
          Retry
        </Button>
      </Box>
    );
  }

  if (ads.length === 0) {
    return (
      <Box className="text-center p-4">
        <Typography variant="h6" color="text.secondary">
          No advertisements available
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Check back later for updates.
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3} className="pt-10 px-6">
      {ads.map((ad, index) => (
        <Grid item xs={12} sm={6} md={3} key={`${ad.id}-${index}`}>
          <Box className="flex flex-col gap-3">
            {/* IMAGE */}
            <img
              src={ad.media}
              alt={ad.topic}
              className="w-full object-cover rounded-lg"
              style={{ height: "200px" }}
              onError={(e) => (e.target.src = "/ad-placeholder.png")}
            />

            {/* TITLE */}
            <Typography variant="h6" className="font-bold text-lg">
              {ad.topic}
            </Typography>

            {/* DESCRIPTION */}
            <Typography variant="body2" className="text-gray-600">
              {ad.description}
            </Typography>

            {/* TIME */}
            <Box className="flex gap-1 text-gray-500 text-sm self-end">
              <AccessTimeIcon sx={{ fontSize: 14 }} />
              <Typography>{timeAgo(ad.createdAt)}</Typography>
            </Box>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
};

export default Advertisement;
