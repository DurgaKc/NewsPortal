import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Link } from "react-router-dom";
import { getAllNews } from "../../AdminPages/International/InterApi";
import { getAllPolitics } from "../../AdminPages/Politics/PoliticsApi";
import { getAllSports } from "../../AdminPages/Sports/SportsApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CurrentNews = () => {
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);

  // Time ago function
  const timeAgo = (date) => {
    const now = new Date();
    const past = new Date(date);
    const diffYears = now.getFullYear() - past.getFullYear();
    if (diffYears >= 1) return `${diffYears} years ago`;

    const diffMonths = now.getMonth() - past.getMonth();
    if (diffMonths >= 1) return `${diffMonths} months ago`;

    const diffDays = Math.floor((now - past) / (1000 * 60 * 60 * 24));
    if (diffDays >= 1) return `${diffDays} days ago`;

    return "Today";
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [intlRes, polRes, sportsRes] = await Promise.all([
          getAllNews(),
          getAllPolitics(),
          getAllSports(),
        ]);

        const getActiveNews = (data) =>
          data
            .filter((item) => item.status === "active" || item.status === true)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 2);

        const intl = getActiveNews(intlRes.data);
        const pol = getActiveNews(polRes.data);
        const sports = getActiveNews(sportsRes.data);

        const combined = [
          ...intl.map((i) => ({ ...i, type: "international" })),
          ...pol.map((i) => ({ ...i, type: "politics" })),
          ...sports.map((i) => ({ ...i, type: "sports" })),
        ];

        setAllStories(
          combined.map((item) => ({
            id: item._id,
            img: item.image ? `${backendUrl}/images/${item.image}` : "/placeholder.jpg",
            label: item.topic,
            description: item.description?.slice(0, 60) + "...",
            time: item.date,
            type: item.type,
          }))
        );
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getNewsRoute = (story) => {
    switch (story.type) {
      case "international":
        return `/international/${story.id}`;
      case "politics":
        return `/politics/${story.id}`;
      case "sports":
        return `/sports/${story.id}`;
      default:
        return "#";
    }
  };

  if (loading) {
    return <Typography className="p-4 text-gray-500">Loading...</Typography>;
  }

  return (
    <Box className="flex flex-col gap-4 mt-4">
      {allStories.map((story) => (
        <Link
          key={story.id}
          to={getNewsRoute(story)}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Box className="bg-white shadow-md rounded-xl flex gap-4 p-3 cursor-pointer hover:shadow-lg transition-all">

            {/* IMAGE */}
            <img
              src={story.img}
              alt={story.label}
              className="w-40 h-28 rounded-lg object-cover"
            />

            {/* TEXT AREA */}
            <Box className="flex flex-col justify-center">
              <Typography variant="h6" className="font-semibold text-gray-900">
                {story.label}
              </Typography>

              <Typography className="text-gray-600 text-sm mt-1">
                {story.description}
              </Typography>

              <Box className="flex items-center gap-1 text-gray-500 text-xs mt-2">
                <AccessTimeIcon style={{ fontSize: "14px" }} />
                <span>{timeAgo(story.time)}</span>
              </Box>
            </Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default CurrentNews;
