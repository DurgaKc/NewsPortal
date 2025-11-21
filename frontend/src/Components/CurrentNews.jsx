import React, { useEffect, useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { getAllNews } from "../Pages/AdminPages/International/InterApi";
import { getAllPolitics } from "../Pages/AdminPages/Politics/PoliticsApi";
import { getAllSports } from "../Pages/AdminPages/Sports/SportsApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CurrentNews = () => {
  const [allStories, setAllStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [intlRes, polRes, sportsRes] = await Promise.all([
          getAllNews(),
          getAllPolitics(),
          getAllSports()
          
        ]);
        // Filter active news and get latest 2 from each category
        const getActiveNews = (data) => {
          return data
            .filter((item) => {
              const statusValue = typeof item.status === "string" 
                ? item.status.toLowerCase() 
                : item.status;
              return statusValue === "active" || statusValue === true;
            })
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 2);
        };

        const intl = getActiveNews(intlRes.data);
        const pol = getActiveNews(polRes.data);
        const sports = getActiveNews(sportsRes.data);

        // Combine all news into a single array for the horizontal scroll
        const combinedStories = [
          ...intl.map(item => ({
            id: item._id, 
            img: item.image ? `${backendUrl}/images/${item.image}` : "/placeholder.jpg",
            label: item.topic,
            type: "international",
            description: item.description
          })),
          ...pol.map(item => ({
            id: item._id,
            img: item.image ? `${backendUrl}/images/${item.image}` : "/placeholder.jpg",
            label: item.topic,
            type: "politics",
            description: item.description
          })),
          ...sports.map(item => ({
            id: item._id,
            img: item.image ? `${backendUrl}/images/${item.image}` : "/placeholder.jpg",
            label: item.topic,
            type: "sports",
            description: item.description
          }))
        ];

        setAllStories(combinedStories);
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Function to get the correct route based on news type
  const getNewsRoute = (story) => {
    if (!story.id) {
      return "#";
    }
    
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
    return (
      <Box className="w-full overflow-x-auto py-2">
        <Box className="flex gap-8 px-4 items-center">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <Box key={index} className="flex items-center gap-2">
              <Avatar 
                sx={{ width: 55, height: 55 }} 
                className="border border-gray-300 bg-gray-200 animate-pulse" 
              />
              <Typography 
                variant="body2" 
                className="text-sm text-gray-400 whitespace-nowrap"
              >
                Loading...
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (!allStories || allStories.length === 0) {
    return (
      <Box className="w-full overflow-x-auto py-2">
        <Box className="flex gap-8 px-4 items-center justify-center">
          <Typography variant="body2" className="text-sm text-gray-500">
            No current news available.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box className="w-full overflow-x-auto py-2">
      <Box className="flex gap-8 px-4 items-center">
        {allStories.map((story) => (
          <Box key={`${story.type}-${story.id}`} className="flex items-center gap-2 flex-shrink-0">
            <Avatar 
              src={story.img} 
              alt={story.label} 
              sx={{ width: 55, height: 55 }} 
              className="border border-gray-300" 
            />
            
            {/* Clickable topic that navigates to details page */}
            <Link
              to={getNewsRoute(story)}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Typography 
                variant="body2" 
                className="text-sm text-gray-800 whitespace-nowrap hover:underline cursor-pointer font-medium"
              >
                {story.label}
              </Typography>
            </Link>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CurrentNews;