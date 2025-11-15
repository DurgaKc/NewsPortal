import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getAllAdvertisements } from "../../AdminPages/Advertisement/AdvertisementApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ timeAgo helper
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);

  const mins = Math.floor(diff / 60);
  const hrs = Math.floor(mins / 60);
  const days = Math.floor(hrs / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (diff < 60) return `${diff} sec ago`;
  if (mins < 60) return `${mins} min ago`;
  if (hrs < 24) return `${hrs} hrs ago`;
  if (days < 30) return `${days} days ago`;
  if (months < 12) return `${months} months ago`;
  return `${years} years ago`;
};

const Heading = () => {
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAdvertisements = async () => {
      try {
        setLoading(true);
        setError("");
        
        const res = await getAllAdvertisements();
        const allAds = res?.data || [];

        // ✅ Only show active advertisements
        const activeAds = allAds.filter((item) => {
          const statusValue =
            typeof item.status === "string"
              ? item.status.toLowerCase()
              : item.status;
          return statusValue === "active" || statusValue === true;
        });

        // ✅ Sort newest → oldest
        const sorted = activeAds.sort(
          (a, b) => new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
        )
         .slice(0, 2); 
        setAds(sorted);
      } catch (err) {
        console.error("Error fetching advertisements:", err);
        setError(err.response?.data?.message || "Failed to load advertisements");
        setAds([]); // Empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchAdvertisements();
  }, []);

  if (loading) {
    return (
      <Box className="w-full max-w-3xl mx-auto mt-4 px-3 flex justify-center items-center py-8">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading advertisements...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="w-full max-w-3xl mx-auto mt-4 px-3 flex justify-center items-center py-8">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!ads || ads.length === 0) {
    return (
      <Box className="w-full max-w-3xl mx-auto mt-4 px-3 flex justify-center items-center py-8">
        <Typography variant="h6" color="text.secondary">
          No advertisements available.
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="w-full max-w-3xl mx-auto mt-4 px-3">
      {ads.map((item) => (
        <Paper
          key={item._id}
          elevation={3}
          sx={{
            borderRadius: "16px",
            overflow: "hidden",
            mb: 4,
            transition: "0.3s",
            cursor: "pointer",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0px 6px 20px rgba(0,0,0,0.15)",
            },
          }}
        >
          {/* 👉 Image */}
          <Box
            component="img"
            src={item.image ? `${backendUrl}/images/${item.image}`: "placerholder.jpg"}
            alt={item.topic}
            sx={{
              width: "100%",
              height: "200px",
              objectFit: "cover",
            }}
          />

          {/* 👉 Text Section */}
          <Box sx={{ p: 3 }}>
            {/* Topic */}
            <Typography
              variant="h5"
              className="font-bold"
              sx={{ textAlign: "center", color: "#1f2937" }}
            >
              {item.topic}
            </Typography>

            {/* Description */}
            <Typography
              sx={{
                mt: 1,
                textAlign: "center",
                color: "#4b5563",
                fontSize: "0.95rem",
                lineHeight: 1.5,
              }}
            >
              {item.description}
            </Typography>

            {/* 👉 Time Ago */}
            <Box
              sx={{
                mt: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                color: "gray",
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <Typography sx={{ fontSize: 14 }}>
                {timeAgo(item.date || item.createdAt)}
              </Typography>
            </Box>
          </Box>
        </Paper>
      ))}
    </Box>
  );
};

export default Heading;