import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getAllBlog } from "../AdminPages/Blog/BlogApi";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Helper: convert date to "time ago"
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

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageItems = 20;
  const otherPageItems = 24;

  // 🎯 Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getAllBlog();
        const data = Array.isArray(res) ? res : res.data || [];

        // Only active blogs
        const activeData = data.filter((item) => {
          const statusValue =
            typeof item.status === "string"
              ? item.status.toLowerCase()
              : item.status;
          return statusValue === "active" || statusValue === true;
        });

        // Sort by newest
        const sorted = activeData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setBlogs(sorted);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="text.secondary">
          No blog posts available.
        </Typography>
      </Box>
    );
  }

  // Featured blog (first one)
  const featured = blogs[0];

  // Pagination
  let paginatedItems = [];
  if (currentPage === 1) {
    paginatedItems = blogs.slice(1, firstPageItems + 1);
  } else {
    const startIndex = 1 + firstPageItems + (currentPage - 2) * otherPageItems;
    const endIndex = startIndex + otherPageItems;
    paginatedItems = blogs.slice(startIndex, endIndex);
  }

  const remainingItems = blogs.length - 1 - firstPageItems;
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
      {/* Featured Blog */}
      {currentPage === 1 && featured && (
        <Grid
          container
          spacing={2}
          className="mb-10 border-b border-gray-300 pb-6"
        >
          <Grid item xs={12} md={7}>
            {featured.video ? (
              <video controls className="w-full h-100 object-cover rounded-lg">
                <source
                  src={`${backendUrl}/videos/${featured.video}`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={`${backendUrl}/images/${featured.image || "default.jpg"}`}
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
            <Link
              to={`/blog/${featured._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h3" className="font-bold leading-snug">
                {featured.topic}
              </Typography>
            </Link>
            <Link
              to={`/blog/${featured._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography className="text-gray-700 text-base pt-6 line-clamp-3">
                {featured.description}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      )}

      {/* Blog Grid */}
      <Grid container spacing={3}>
        {paginatedItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${item._id}-${index}`}>
            <Box className="flex flex-col gap-2">
              {item.video ? (
                <video controls className="w-full h-90 object-cover rounded-lg">
                  <source
                    src={`${backendUrl}/videos/${item.video}`}
                    type="video/mp4"
                  />
                </video>
              ) : (
                <img
                  src={`${backendUrl}/images/${item.image || "default.jpg"}`}
                  alt={item.topic}
                  className="w-full h-90 object-cover rounded-lg"
                />
              )}
              <Link
                to={`/blog/${featured._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography variant="h5" className="font-semibold">
                  {item.topic}
                </Typography>
              </Link>

              <Typography className="text-gray-700 text-sm line-clamp-2">
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
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

export default Blog;
