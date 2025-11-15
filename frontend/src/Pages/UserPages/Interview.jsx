import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getAllInterview } from "../AdminPages/Interview/InterviewApi"; // ✅ Import API function
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Helper: convert date → relative time (like “2 hrs ago”)
const timeAgo = (date) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const Interview = () => {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageItems = 20;
  const otherPageItems = 24;

  // ✅ Fetch interviews from API
  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await getAllInterview();
        const data = Array.isArray(res) ? res : res.data || [];

        // ✅ Only active interviews
        const activeData = data.filter((item) => {
          const statusValue =
            typeof item.status === "string"
              ? item.status.toLowerCase()
              : item.status;
          return statusValue === "active" || statusValue === true;
        });

        // ✅ Sort by newest date
        const sorted = activeData.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setInterviews(sorted);
      } catch (error) {
        console.error("Error fetching interviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviews();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!interviews || interviews.length === 0) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="text.secondary">
          No interview news available.
        </Typography>
      </Box>
    );
  }

  // ✅ Featured interview (first one)
  const featured = interviews[0];

  // ✅ Pagination logic
  let paginatedItems = [];
  if (currentPage === 1) {
    paginatedItems = interviews.slice(1, firstPageItems + 1);
  } else {
    const startIndex = 1 + firstPageItems + (currentPage - 2) * otherPageItems;
    const endIndex = startIndex + otherPageItems;
    paginatedItems = interviews.slice(startIndex, endIndex);
  }

  const remainingItems = interviews.length - 1 - firstPageItems;
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
      {/* ✅ Featured Interview */}
      {currentPage === 1 && featured && (
        <Grid
          container
          spacing={2}
          className="mb-10 border-b border-gray-300 pb-6"
        >
          <Grid item xs={12} md={7}>
            {/* ✅ Video or Image */}
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
              to={`/interview/${featured._id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography variant="h3" className="font-bold leading-snug">
                {featured.topic}
              </Typography>
            </Link>

            <Typography className="text-gray-700 text-base pt-6 line-clamp-3">
              {featured.description}
            </Typography>
          </Grid>
        </Grid>
      )}

      {/* ✅ Interview Grid */}
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
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={`${backendUrl}/images/${item.image || "default.jpg"}`}
                  alt={item.topic}
                  className="w-full h-90 object-cover rounded-lg"
                />
              )}
              <Link
                to={`/interview/${featured._id}`}
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

      {/* ✅ Pagination Controls */}
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

export default Interview;
