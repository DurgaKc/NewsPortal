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
import { getAllLatestNews } from "../AdminPages/LatestNews/LatestNewsApi";
import { Link } from "react-router-dom";

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
const LatestNewss = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // ITEMS PER PAGE
  const firstPageItems = 20;
  const otherPageItems = 20;

  // Fetch API
  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllLatestNews();
        const newsData = response.data;

        if (Array.isArray(newsData)) {
          const formattedNews = newsData
            .sort(
              (a, b) =>
                new Date(b.date || b.createdAt) -
                new Date(a.date || a.createdAt)
            )
            .map((item) => ({
              id: item._id,
              topic: item.topic,
              media: item.image
                ? `${backendUrl}/images/${item.image}`
                : "/news.png",
              createdAt: item.date || item.createdAt,
            }));

          setNews(formattedNews);
        } else {
          setNews([]);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load news. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [backendUrl]);

  // Pagination Logic
  let paginatedItems = [];
  if (currentPage === 1) {
    paginatedItems = news.slice(0, firstPageItems);
  } else {
    const startIndex = firstPageItems + (currentPage - 2) * otherPageItems;
    const endIndex = startIndex + otherPageItems;
    paginatedItems = news.slice(startIndex, endIndex);
  }

  const remainingItems = news.length - firstPageItems;
  const totalPages =
    1 + Math.ceil(Math.max(0, remainingItems) / otherPageItems);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage(currentPage + 1);

  // Loading UI
  if (loading) {
    return (
      <Box className="flex justify-center items-center min-h-40">
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading latest news...</Typography>
      </Box>
    );
  }

  // Error UI
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

  // No data UI
  if (news.length === 0) {
    return (
      <Box className="text-center p-4">
        <Typography variant="h6" color="text.secondary">
          No latest news available
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Check back later for updates.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      {/* NEWS GRID */}
      <Grid container spacing={3} className="pt-10 px-6">
        {paginatedItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={`${item.id}-${index}`}>
            <Box className="flex flex-col gap-3">
              {/* IMAGE */}
              <img
                src={item.media}
                alt={item.topic}
                className="w-full object-cover rounded-lg"
                style={{ height: "200px" }}
                onError={(e) => (e.target.src = "/news.png")}
              />

              {/* TITLE */}
              <Link to={`/latestnews/${item.id}`}>
                <Typography variant="h6" className="font-bold text-lg">
                  {item.topic}
                </Typography>
              </Link>
              {/* TIME */}
              <Box className="flex gap-1 text-gray-500 text-sm self-end">
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography>{timeAgo(item.createdAt)}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* PAGINATION */}
      <Box className="flex justify-end items-center mt-8 gap-4 pr-6">
        <Button
          variant="contained"
          size="small"
          disabled={currentPage === 1}
          onClick={handlePrev}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            padding: "6px 16px",
          }}
        >
          Prev
        </Button>

        <Typography className="text-gray-700 font-medium">
          {currentPage} / {totalPages}
        </Typography>

        <Button
          variant="contained"
          size="small"
          disabled={currentPage === totalPages}
          onClick={handleNext}
          sx={{
            textTransform: "none",
            borderRadius: "8px",
            padding: "6px 16px",
          }}
        >
          Next
        </Button>
      </Box>
    </>
  );
};

export default LatestNewss;
