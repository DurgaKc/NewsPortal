import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PoliticsSidebar from "../../Components/PoliticsSidebar";
import { getAllPolitics } from "../AdminPages/Politics/PoliticsApi";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Time Ago function
const timeAgo = (date) => {
  const now = new Date();
  const past = new Date(date);
  const diff = Math.floor((now - past) / 1000);

  if (diff < 60) return `${diff} seconds ago`;
  const mins = Math.floor(diff / 60);
  if (mins < 60) return `${mins} minutes ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hours ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} months ago`;
  return `${Math.floor(months / 12)} years ago`;
};

const Politics = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await getAllPolitics();

        const activeNews = response.data.filter((item) => {
          const statusValue = typeof item.status === "string"
            ? item.status.toLowerCase()
            : item.status;

          return statusValue === "active" || statusValue === true;
        });

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

  if (!newsData.length) {
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6" color="text.secondary">
          No politics news available.
        </Typography>
      </Box>
    );
  }

  const featured = newsData[0];
  const remaining = newsData.slice(1);

  return (
    <Box className="flex w-full h-screen">
      <Box className="w-full p-4 overflow-y-auto">
        
        {/* FEATURED NEWS */}
        {featured && (
          <Box className="mb-8 flex flex-col md:flex-row gap-4 items-start">

              <img
                src={`${backendUrl}/images/${featured.image}`}
                alt={featured.topic}
                className="w-full md:w-1/2 h-80 object-cover rounded-lg cursor-pointer"
              />
          

            {/* RIGHT: Text Content */}
            <Box className="flex flex-col justify-between md:w-1/2">
              <Box className="flex items-center gap-2 text-gray-500 text-sm mt-auto mr-6 self-end">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography>{timeAgo(featured.date)}</Typography>
              </Box>

              <Typography
                variant="h4"
                className="font-bold pt-6 hover:underline cursor-pointer"
                component={Link}
                to={`/politics/${featured._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {featured.topic}
              </Typography>

              <Typography
                className="text-gray-700 text-base pt-6 hover:underline cursor-pointer line-clamp-3"
                component={Link}
                to={`/politics/${featured._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {featured.description}
              </Typography>
            </Box>
          </Box>
        )}

        {/* REMAINING NEWS LIST */}
        <Box sx={{ display: "flex", gap: 2, height: "calc(100vh - 32px)" }}>
          
          {/* LEFT LIST */}
          <Box
            sx={{
              flex: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {remaining.map((item) => (
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
                  <Typography
                    component={Link}
                    to={`/politics/${item._id}`}
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.topic}
                  </Typography>

                  <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="caption">{timeAgo(item.date)}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* SIDEBAR */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              borderLeft: "1px solid #ccc",
              p: 2,
            }}
          >
            <PoliticsSidebar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Politics;
