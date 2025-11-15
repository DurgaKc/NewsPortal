import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getAllEntertainment } from "../AdminPages/Entertainment/EntertainmentApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Time ago formatter
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

// Get first image/video URL based on backend structure
const getMediaUrl = (item) => {
  if (item?.images?.length > 0) {
    return `${backendUrl}/images/${item.images[0]}`;
  }
  if (item?.videos?.length > 0) {
    return `${backendUrl}/videos/${item.videos[0]}`;
  }
  return "/placeholder.jpg";
};

// Check if URL is video
const isVideo = (url) =>
  url.endsWith(".mp4") ||
  url.endsWith(".mov") ||
  url.endsWith(".avi") ||
  url.endsWith(".mkv");

const Entertainment = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageItems = 20; // excluding featured
  const otherPageItems = 24;

  // Fetch entertainment posts
  useEffect(() => {
    const fetchEntertainment = async () => {
      try {
        const res = await getAllEntertainment();
        const sorted = res.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setNews(sorted);
      } catch (err) {
        console.error("Error fetching entertainment posts:", err);
      }
    };

    fetchEntertainment();
  }, []);

  // Featured post
  const featured = news[0];

  // Pagination logic
  let paginatedItems = [];
  if (currentPage === 1) {
    paginatedItems = news.slice(1, firstPageItems + 1);
  } else {
    const startIndex =
      1 + firstPageItems + (currentPage - 2) * otherPageItems;
    const endIndex = startIndex + otherPageItems;
    paginatedItems = news.slice(startIndex, endIndex);
  }

  const remainingItems = news.length - 1 - firstPageItems;
  const totalPages =
    1 + Math.ceil(Math.max(0, remainingItems) / otherPageItems);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Box className="w-full p-5 pt-10">
      {/* Featured Card (only on first page) */}
      {currentPage === 1 && featured && (
        <Grid
          container
          spacing={2}
          className="mb-10 border-b border-gray-300 pb-6"
        >
          <Grid item xs={12} md={7}>
            {isVideo(getMediaUrl(featured)) ? (
              <video
                src={getMediaUrl(featured)}
                controls
                className="w-full h-100 object-cover rounded-lg"
              />
            ) : (
              <img
                src={getMediaUrl(featured)}
                alt={featured.topic}
                className="w-full h-100 object-cover rounded-lg"
              />
            )}
          </Grid>

          <Grid item xs={12} md={5}>
            <Box className="flex justify-end mt-2">
              <Box className="flex items-center gap-1 text-gray-500 text-sm mr-12">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography>{timeAgo(featured.date)}</Typography>
              </Box>
            </Box>

            <Typography variant="h3" className="font-bold leading-snug">
              {featured.topic}
            </Typography>

            <Typography className="text-gray-700 text-base pt-6 line-clamp-3">
              {featured.description}
            </Typography>
          </Grid>
        </Grid>
      )}

      {/* Grid Items */}
      <Grid container spacing={3}>
        {paginatedItems.map((item, index) => {
          const mediaUrl = getMediaUrl(item);

          return (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={`${item.id}-${index}`}
            >
              <Box className="flex flex-col gap-2">
                {isVideo(mediaUrl) ? (
                  <video
                    src={mediaUrl}
                    controls
                    className="w-full h-90 object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={mediaUrl}
                    alt={item.topic}
                    className="w-full h-90 object-cover rounded-lg"
                  />
                )}

                <Typography variant="h5" className="font-semibold">
                  {item.topic}
                </Typography>

                <Typography className="text-gray-700 text-sm line-clamp-2">
                  {item.description}
                </Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      {/* Pagination */}
      <Box className="flex justify-end items-center mt-8 gap-4 pr-4">
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
    </Box>
  );
};

export default Entertainment;
