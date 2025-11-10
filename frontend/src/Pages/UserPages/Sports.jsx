import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Sidebar from "../../Components/Sidebar";
import { getAllSports } from "../AdminPages/Sports/SportsApi";
import { Link } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ timeAgo (seconds → minutes → hours → days → months → years)
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

// ✅ Helper: show only first 20 words
const shortDescription = (text = "") => {
  const words = text.split(" ");
  if (words.length <= 20) return text;
  return words.slice(0, 20).join(" ") + "...";
};

const Sports = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSportsNews = async () => {
      try {
        const res = await getAllSports();
        const allNews = res.data || [];

        // ✅ Only show active items
        const activeNews = allNews.filter((item) => {
          const statusValue =
            typeof item.status === "string"
              ? item.status.toLowerCase()
              : item.status;
          return statusValue === "active" || statusValue === true;
        });

        // ✅ Sort newest → oldest
        const sorted = activeNews.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setNews(sorted);
      } catch (err) {
        console.error("Error fetching sports news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSportsNews();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!news || news.length === 0) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="text.secondary">
          No sports news available.
        </Typography>
      </Box>
    );
  }

  const topNews = news[0];
  const remaining = news.slice(1);

  return (
    <Box className="flex w-full h-screen">
      {/* MAIN CONTENT */}
      <Box className="w-full p-4 overflow-y-auto">
        {/* ✅ FEATURED SPORTS NEWS */}
        {topNews && (
          <Box className="mb-8 flex flex-col md:flex-row gap-4 items-start">
            {/* LEFT: Image */}
            <img
              src={`${backendUrl}/images/${topNews.image}`}
              alt={topNews.topic}
              className="w-full md:w-1/2 h-80 md:h-90 object-cover rounded-lg"
            />

            {/* RIGHT: Text content */}
            <Box className="flex flex-col justify-between md:w-1/2">
              <Box className="flex items-center gap-2 text-gray-500 text-sm mt-auto mr-6 self-end">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography>{timeAgo(topNews.date)}</Typography>
              </Box>

              <Typography variant="h4" className="font-bold pt-6">
                {topNews.topic}
              </Typography>

              {topNews.description && (
                <Typography className="text-gray-700 text-base mb-2 line-clamp-3 pt-6">
                  {shortDescription(topNews.description)}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* ✅ REMAINING SPORTS NEWS */}
        <Box sx={{ display: "flex", gap: 2, height: "calc(100vh - 32px)" }}>
          {/* LEFT: Sports list */}
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
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      lineHeight: 1.3,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    component={Link}
                    to={`/sports/${item._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.topic}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      mb: 1,
                      lineHeight: 1.5,
                    }}
                  >
                    {shortDescription(item.description)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                    }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="caption">{timeAgo(item.date)}</Typography>
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

export default Sports;
