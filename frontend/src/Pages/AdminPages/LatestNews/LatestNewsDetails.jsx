import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getLatestNewsById } from "./LatestNewsApi"; // <-- CHANGED
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const LatestNewsDetails = () => {
  const { id } = useParams();
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getLatestNewsById(id); // <-- CHANGED
        setNews(response);
      } catch (error) {
        console.error("Error fetching latest news detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading)
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );

  if (!news)
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6">Latest news not found.</Typography>
      </Box>
    );

  return (
    <Box className="p-6 md:p-10">
      <Link to="/latestnewss" style={{ textDecoration: "none" }}> 
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
          ← Back to Latest News
        </Button>
      </Link>

      <Grid container spacing={2} className="mb-6">

        {/* 🖼️ Left side image */}
        <Grid item xs={12} md={4}>
          <img
            src={`${backendUrl}/images/${news.image}`}
            alt={news.topic}
            className="w-full h-60 object-cover rounded-lg shadow-md"
          />
        </Grid>

        {/* 📰 Topic, date */}
        <Grid item xs={12} md={8}>
          <Box className="flex flex-col justify-start h-full gap-2 relative">

            {/* Date */}
            <Box className="absolute top-0 right-0 flex items-center gap-1 text-gray-600">
              <AccessTimeIcon sx={{ fontSize: 16 }} />
              <Typography variant="body2">
                {new Date(news.date).toLocaleString()}
              </Typography>
            </Box>

            {/* Topic */}
            <Typography variant="h5" className="font-semibold pt-10">
              {news.topic}
            </Typography>
          </Box>
        </Grid>

        {/* Description */}
        <Typography className="text-gray-700 text-sm leading-relaxed pt-10">
          {news.description}
        </Typography>

      </Grid>
    </Box>
  );
};

export default LatestNewsDetails;
