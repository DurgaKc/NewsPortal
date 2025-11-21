import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { getAllLocalGovernment } from "../AdminPages/LocalGovernment/LocalGovernmentApi";
import { Link } from "react-router-dom";
import LocalGovtSidebar from "../../Components/LocalGovtSidebar";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Time Ago Function
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

// Short description
const shortDescription = (text = "") => {
  const words = text.split(" ");
  if (words.length <= 20) return text;
  return words.slice(0, 20).join(" ") + "...";
};

const LocalGovernment = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getAllLocalGovernment();
        const active = res.data.filter((item) => {
          const s = typeof item.status === "string" ? item.status.toLowerCase() : item.status;
          return s === "active" || s === true;
        });

        const sorted = active.sort((a, b) => new Date(b.date) - new Date(a.date));
        setNews(sorted);
      } catch (err) {
        console.error("Error fetching local government news:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!news.length) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" color="text.secondary">
          No Local Government news available.
        </Typography>
      </Box>
    );
  }

  const topNews = news[0];
  const remaining = news.slice(1);

  return (
    <Box className="flex w-full h-screen">
      <Box className="w-full p-4 overflow-y-auto">

        {topNews && (
          <Box className="mb-8 flex flex-col md:flex-row gap-4 items-start">

            <img
              src={`${backendUrl}/images/${topNews.image}`}
              alt={topNews.topic}
              className="w-full md:w-1/2 h-80 object-cover rounded-lg"
            />

            <Box className="flex flex-col justify-between md:w-1/2">
              <Box className="flex items-center gap-2 text-gray-500 text-sm mt-auto mr-6 self-end">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography>{timeAgo(topNews.date)}</Typography>
              </Box>

              {/* Topic (clickable) */}
              <Typography
                variant="h4"
                className="font-bold pt-6 hover:underline cursor-pointer"
                component={Link}
                to={`/local-government/${topNews._id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {topNews.topic}
              </Typography>

              {/* Description (clickable) */}
              {topNews.description && (
                <Typography
                  className="text-gray-700 text-base mb-2 line-clamp-3 pt-6 hover:underline cursor-pointer"
                  component={Link}
                  to={`/local-government/${topNews._id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  {shortDescription(topNews.description)}
                </Typography>
              )}
            </Box>
          </Box>
        )}

        {/* =============== REMAINING NEWS LIST =================== */}
        <Box sx={{ display: "flex", gap: 2, height: "calc(100vh - 32px)" }}>
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
                  {/* Topic clickable */}
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 600,
                      mb: 1,
                      cursor: "pointer",
                      "&:hover": { textDecoration: "underline" },
                    }}
                    component={Link}
                    to={`/local-government/${item._id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {item.topic}
                  </Typography>

                  {/* Short description */}
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 1 }}
                  >
                    {shortDescription(item.description)}
                  </Typography>

                  {/* Time */}
                  <Box sx={{ display: "flex", alignItems: "center", color: "text.secondary" }}>
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="caption">{timeAgo(item.date)}</Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* RIGHT SIDEBAR */}
          <Box
            sx={{
              flex: 1,
              overflowY: "auto",
              borderLeft: "1px solid #ccc",
              p: 2,
            }}
          >
            <LocalGovtSidebar />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LocalGovernment;
