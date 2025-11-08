import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getAllNews } from "../AdminPages/International/InterApi";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const timeAgo = (date) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const International = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageItems = 20;
  const otherPageItems = 24;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getAllNews();

     // Only include active news
     const activeNews = response.data.filter((item) => {
        const statusValue =
          typeof item.status === "string"
            ? item.status.toLowerCase()
            : item.status;
        return statusValue === "active" || statusValue === true;
      });

        const sortedNews = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setNews(sortedNews);
      } catch (error) {
        console.error("Error fetching international news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6">Loading news...</Typography>
      </Box>
    );
  }

  if (!news || news.length === 0) {
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6" color="text.secondary">
          No international news available.
        </Typography>
      </Box>
    );
  }

  const featured = news[0];
  let paginatedItems = [];

  if (currentPage === 1) {
    paginatedItems = news.slice(1, firstPageItems + 1);
  } else {
    const startIndex = 1 + firstPageItems + (currentPage - 2) * otherPageItems;
    const endIndex = startIndex + otherPageItems;
    paginatedItems = news.slice(startIndex, endIndex);
  }

  const remainingItems = news.length - 1 - firstPageItems;
  const totalPages = 1 + Math.ceil(Math.max(0, remainingItems) / otherPageItems);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Box className="w-full p-5 pt-10">
      {/* ✅ Featured News */}
      {currentPage === 1 && featured && (
        <Grid container spacing={2} className="mb-10 border-b border-gray-300 pb-6">
          <Grid item xs={12} md={7}>
            <img
              src={`${backendUrl}/images/${featured.image}`}
              alt={featured.topic}
              className="w-full h-100 object-cover rounded-lg"
            />
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

            {/* ✅ Link to details page */}
            <Link
              to={`/international/${featured._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography className="text-gray-700 text-base pt-6 hover:underline line-clamp-3">
                {featured.description}
              </Typography>
            </Link>
          </Grid>
        </Grid>
      )}

      {/* ✅ News Grid */}
      <Grid container spacing={2}>
        {paginatedItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={`${item._id}-${index}`}>
            <Box className="flex flex-col gap-2">
              <img
                src={`${backendUrl}/images/${item.image}`}
                alt={item.topic}
                className="w-full h-90 object-cover rounded-lg"
              />

              <Typography variant="h5" className="font-semibold">
                {item.topic}
              </Typography>

              <Link
                to={`/international/${item._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Typography className="text-gray-700 text-sm line-clamp-2 hover:underline">
                  {item.description}
                </Typography>
              </Link>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Pagination Buttons */}
      <Box className="flex justify-end items-center mt-8 gap-4 pr-4">
        <Button
          variant="contained"
          size="small"
          disabled={currentPage === 1}
          onClick={handlePrev}
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
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default International;
