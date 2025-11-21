import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { getAllLatestNews } from "../../AdminPages/LatestNews/LatestNewsApi";

const LatestNews = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await getAllLatestNews();
        const newsData = response.data || [];

        const sortedNews = newsData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setItems(sortedNews.slice(0, 3));
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch latest news");
      } finally {
        setLoading(false);
      }
    };

    fetchLatestNews();
  }, []);

  if (loading) return <Typography>Loading latest news...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (items.length === 0) return <Typography>No news found</Typography>;

  return (
    <Box sx={{ width: "100%", mb: 4 }}>
      {items.map((item) => {
        const imageUrl = item.image
          ? `${backendUrl}/images/${item.image}`
          : "/no-image.png";

        return (
          <Box key={item._id} sx={{ mb: 4, textAlign: "center" }}>
            {/* TOPIC */}
            <Link
              to={`/latestnews/${item._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  mb: 1,
                  cursor: "pointer",
                  "&:hover": { color: "#1976d2" },
                  textAlign: "center",
                }}
              >
                {item.topic}
              </Typography>
            </Link>

            {/* AUTHOR */}
            <Typography
              sx={{
                fontSize: "0.95rem",
                color: "#666",
                mb: 2,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1,
              }}
            >
              <span style={{ fontSize: "1.2rem" }}>•</span>
              {item.author || "Unknown Author"}
            </Typography>

            {/* IMAGE */}
            <Link to={`/latestnews/${item._id}`}>
              <Box sx={{ px: 5 }}>
                {" "}
                {/* Add left & right padding */}
                <img
                  src={imageUrl}
                  alt={item.topic}
                  style={{
                    width: "100%",
                    height: 500,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Box>
            </Link>

            {/* DESCRIPTION */}
            <Typography sx={{ mt: 1, color: "#555" }}>
              {(item.description || "").slice(0, 150)}...
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default LatestNews;
