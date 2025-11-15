import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  Avatar,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { useNavigate } from "react-router-dom";

// ✅ Import APIs
import { getAllPolitics } from "../Pages/AdminPages/Politics/PoliticsApi";
import { getAllLocalGovernment} from "../Pages/AdminPages/LocalGovernment/LocalGovernmentApi"
import { getAllNews } from "../Pages/AdminPages/International/InterApi";
import { getAllHealth } from "../Pages/AdminPages/Health/HealthApi";
import { getAllEducation } from "../Pages/AdminPages/Education/EducationApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// ✅ Reusable card for news preview
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
    <Typography
      variant="body1"
      sx={{ fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}
    >
      {title}
    </Typography>
  </Card>
);

const SportsSidebar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  // ✅ News state per category
  const [politics, setPolitics] = useState([]);
  const [localGov, setLocalGov] = useState([]);
  const [international, setInternational] = useState([]);
  const [health, setHealth] = useState([]);
  const [education, setEducation] = useState([]);

  // ✅ Fetch all news on mount
  useEffect(() => {
    const fetchAllNews = async () => {
      try {
        const [politicsRes, localRes, interRes, healthRes, eduRes] =
          await Promise.all([
            getAllPolitics(),
            getAllLocalGovernment(),
            getAllNews(),
            getAllHealth(),
            getAllEducation(),
          ]);

        setPolitics(politicsRes.data || []);
        setLocalGov(localRes.data || []);
        setInternational(interRes.data || []);
        setHealth(healthRes.data || []);
        setEducation(eduRes.data || []);
      } catch (error) {
        console.error("Error fetching sidebar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllNews();
  }, []);

  // ✅ While fetching
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

  // ✅ Define category sections dynamically
  const categories = [
    {
      key: "politics",
      title: "राजनीति",
      data: politics,
      route: "/politics",
    },
    {
      key: "localGov",
      title: "स्थानीय सरकार",
      data: localGov,
      route: "/local",
    },
    {
      key: "international",
      title: "अन्तर्राष्ट्रिय",
      data: international,
      route: "/international",
    },
    {
      key: "health",
      title: "स्वास्थ्य",
      data: health,
      route: "/health",
    },
    {
      key: "education",
      title: "शिक्षा",
      data: education,
      route: "/education",
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
          {/* ✅ Header */}
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

          {/* ✅ Show 4 latest news */}
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

export default SportsSidebar;
