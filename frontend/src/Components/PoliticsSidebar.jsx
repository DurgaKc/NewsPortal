import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useNavigate } from "react-router-dom";
import { getAllLocalGovernment} from "../Pages/AdminPages/LocalGovernment/LocalGovernmentApi"
import { getAllNews } from "../Pages/AdminPages/International/InterApi";
import { getAllSports } from "../Pages/AdminPages/Sports/SportsApi";
import { getAllHealth } from "../Pages/AdminPages/Health/HealthApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Reusable small card for news items
const SidebarProfile = ({ title, image }) => (
  <Card
    sx={{
      mb: 2,
      display: "flex",
      alignItems: "center",
      p: 1,
      boxShadow: 1,
      cursor: "pointer",
      "&:hover": { backgroundColor: "#f5f5f5" },
    }}
  >
    <Avatar
      src={image || "/placeholder.jpg"}
      sx={{ width: 56, height: 56, mr: 2 }}
    />
    <Typography variant="body1" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
  </Card>
);

const PoliticsSidebar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [internationalNews, setInternationalNews] = useState([]);
  const [localNews, setLocalNews] = useState([]);
  const [sportsNews, setSportsNews] = useState([]);
  const [healthNews, setHealthNews] = useState([]);

useEffect(() => {
  const fetchAllNews = async () => {
    try {
      const [interRes, localRes, sportsRes, healthRes] = await Promise.all([
        getAllNews(),
        getAllLocalGovernment(),
        getAllSports(),
        getAllHealth(),
      ]);

      const filterActive = (data) => {
        return (data || []).filter((item) => {
          const status = typeof item.status === "string" ? item.status.toLowerCase() : item.status;
          return status === "active" || status === true;
        });
      };

      setInternationalNews(filterActive(interRes.data));
      setLocalNews(filterActive(localRes.data));
      setSportsNews(filterActive(sportsRes.data));
      setHealthNews(filterActive(healthRes.data));
    } catch (error) {
      console.error("Error fetching sidebar news:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchAllNews();
}, []);


  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  // ✅ Define categories dynamically
  const categories = [
    {
      key: "international",
      title: "अन्तर्राष्ट्रिय",
      data: internationalNews,
      route: "/international",
    },
    {
      key: "local",
      title: "स्थानीय सरकार",
      data: localNews,
      route: "/local-government",
    },
    {
      key: "sports",
      title: "खेलकुद",
      data: sportsNews,
      route: "/sports",
    },
    {
      key: "health",
      title: "स्वास्थ्य",
      data: healthNews,
      route: "/health",
    },
  ];

  return (
    <Box
      sx={{
        p: 2,
        overflowY: "auto",
        height: "100vh",
        borderLeft: 1,
        borderColor: "divider",
      }}
    >
      {categories.map(({ key, title, data, route }) => (
        <Box key={key} sx={{ mb: 4 }}>
          {/* ✅ Category Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 1,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <IconButton onClick={() => navigate(route)}>
              <ArrowCircleRightOutlinedIcon fontSize="small" color="action" />
            </IconButton>
          </Box>

          {/* ✅ Top 4 news items */}
          {data.slice(0, 4).map((news) => (
            <SidebarProfile
              key={news._id || news.id}
              title={news.topic}
              image={
                news.image
                  ? `${backendUrl}/images/${news.image}`
                  : "/placeholder.jpg"
              }
            />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default PoliticsSidebar;
