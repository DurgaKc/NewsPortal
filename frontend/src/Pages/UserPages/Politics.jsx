import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Sidebar from "../../Components/Sidebar";
import { getAllPolitics } from "../AdminPages/Politics/PoliticsApi";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Helper function to format time ago
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now - past) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes ago`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours ago`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays} days ago`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} months ago`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears} years ago`;
};


const Politics = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getAllPolitics();

        // Only include active news
        const activeNews = response.data.filter((item) => {
          const statusValue =
            typeof item.status === "string"
              ? item.status.toLowerCase()
              : item.status;
          return statusValue === "active" || statusValue === true;
        });

        // Sort by date descending
        const sortedNews = activeNews.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setNewsData(sortedNews);
      } catch (error) {
        console.error("Error fetching politics news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6">Loading politics news...</Typography>
      </Box>
    );
  }

  if (!newsData || newsData.length === 0) {
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6" color="text.secondary">
          No politics news available.
        </Typography>
      </Box>
    );
  }

  const featured = newsData[0];

  return (
    <Box className="flex w-full h-screen">
      {/* LEFT SECTION */}
      <Box className="w-full p-4 overflow-y-auto">
        {/* Featured news */}
        {featured && (
          <Box
            key={featured._id}
            className="mb-8 flex flex-col md:flex-row gap-4 items-start"
          >
            {/* LEFT: Image */}
            <img
              src={`${backendUrl}/images/${featured.image}`}
              alt={featured.topic}
              className="w-full md:w-1/2 h-80 md:h-90 object-cover rounded-lg"
            />

            {/* RIGHT: Time + Topic */}
            <Box className="flex flex-col justify-between md:w-1/2">
              <Box className="flex items-center gap-2 text-gray-500 text-sm mt-auto mr-6 self-end">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography>{timeAgo(featured.date)}</Typography>
              </Box>
              <Typography variant="h4" className="font-bold pt-6">
                {featured.topic}
              </Typography>

              {featured.description && (
                <Typography className="text-gray-700 text-base mb-2 line-clamp-3 pt-6">
                  {featured.description}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* Remaining news items in cards */}
        <Box sx={{ display: "flex", gap: 2, height: "calc(100vh - 32px)" }}>
          {/* LEFT: News List */}
          <Box
            sx={{
              flex: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {newsData.slice(1).map((item) => (
              <Card key={item._id} sx={{ display: "flex", overflow: "hidden" }}>
                <Box
                  component="img"
                  src={`${backendUrl}/images/${item.image}`}
                  alt={item.topic}
                  sx={{ width: 220, height: 140, objectFit: "cover" }}
                />
                <CardContent
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.topic}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                    }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="caption">
                      {timeAgo(item.date)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* RIGHT: Sidebar */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              borderLeft: "1px solid #ccc",
              p: 2,
            }}
          >
            <Sidebar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Politics;
