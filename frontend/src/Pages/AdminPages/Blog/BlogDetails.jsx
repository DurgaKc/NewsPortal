import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getBlogById } from "../../AdminPages/Blog/BlogApi"; // Make sure this API exists

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await getBlogById(id);
        setBlog(response);
      } catch (error) {
        console.error("Error fetching blog detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading)
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );

  if (!blog)
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6">Blog not found.</Typography>
      </Box>
    );

  return (
    <Box className="p-6 md:p-10">
      <Link to="/blog" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "0.8rem",
            padding: "3px 10px",
            borderRadius: "8px",
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              borderColor: "#1565c0",
            },
            marginBottom: "20px",
          }}
        >
          ← Back to Blogs
        </Button>
      </Link>

      <Grid container spacing={2} className="mb-6">
        {/* 🖼️ Left side: blog image */}
        <Grid item xs={12} md={4}>
          <img
            src={blog.image ? `${backendUrl}/images/${blog.image}` : "placeholder.jpg"}
            alt={blog.topic}
            className="w-full h-60 object-cover rounded-lg shadow-md"
          />
        </Grid>

        {/* 📰 Right side: topic + date */}
        <Grid item xs={12} md={8}>
          <Box className="flex flex-col justify-start h-full gap-2 relative">
            <Box className="absolute top-0 right-0 flex items-center gap-1 text-gray-600">
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {new Date(blog.date || blog.createdAt).toLocaleString()}
              </Typography>
            </Box>

            {/* topic */}
            <Typography variant="h5" className="font-semibold pt-10">
              {blog.topic}
            </Typography>
          </Box>
        </Grid>

        {/* Description */}
        <Grid item xs={12}>
          <Typography className="text-gray-700 text-sm leading-relaxed pt-10">
            {blog.description}
          </Typography>
        </Grid>

        {/* Status */}
        <Grid item xs={12}>
          <Box className="pt-6">
            <Typography variant="body2" className="text-gray-600">
              Status:{" "}
              <span
                className={`font-semibold ${
                  blog.status === "active"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {blog.status?.charAt(0).toUpperCase() + blog.status?.slice(1)}
              </span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BlogDetails;
