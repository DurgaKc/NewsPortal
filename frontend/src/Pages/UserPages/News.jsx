import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const sampleData = [
  {
    id: 1,
    topic: "Breaking News: अर्थशास्त्र",
    media: "/tiger.jpeg",
    createdAt: "2025-10-13T06:30:00Z",
  },
  {
    id: 2,
    topic: "इजरायल-गाजा द्वन्द्व",
    media: "/news.png",
    createdAt: "2025-10-14T03:00:00Z",
  },
  {
    id: 3,
    topic: "स्थानीय चुनाव",
    media: "/tiger.jpeg",
    createdAt: "2025-10-13T06:30:00Z",
  },
  {
    id: 4,
    topic: "अन्तर्राष्ट्रिय सम्बन्ध",
    media: "/tiger.jpeg",
    createdAt: "2025-10-13T06:30:00Z",
  },
  {
    id: 5,
    topic: "राजनीतिक संवाद",
    media: "/news.png",
    createdAt: "2025-10-14T03:00:00Z",
  },
];

// Function to calculate relative time
const timeAgo = (date) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const News = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageItems = 20;
  const otherPageItems = 20;

  useEffect(() => {
    setNews(sampleData);
  }, []);

  // ✅ Pagination Logic
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

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <Grid container spacing={3} className="pt-10 px-6">
        {paginatedItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={`${item.id}-${index}`}>
            <Box className="flex flex-col gap-3">
              {/* Photo */}
              <img
                src={item.media}
                alt={item.topic}
                className="w-full h-75 object-cover rounded-lg"
              />
              {/* Topic */}
              <Typography variant="h6" className="font-bold text-lg">
                {item.topic}
              </Typography>

              {/* Dynamic Time */}
              <Box className="flex gap-1 text-gray-500 text-sm self-end">
                <AccessTimeIcon sx={{ fontSize: 14 }} />
                <Typography>{timeAgo(item.createdAt)}</Typography>
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Right-Aligned Pagination */}
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

export default News;
