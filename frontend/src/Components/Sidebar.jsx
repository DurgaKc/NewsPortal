import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Avatar, Typography, IconButton } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { getAllNews } from "../Pages/AdminPages/International/InterApi";
import { useNavigate } from "react-router-dom";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

// Sample news data grouped by category
const newsByCategory = {
  अन्तर्राष्ट्रिय: [
    { id: 1, title: "अन्तर्राष्ट्रिय समाचार १", image: "/scene.jpg" },
    { id: 2, title: "अन्तर्राष्ट्रिय समाचार २", image: "/scene.jpg" },
    { id: 3, title: "अन्तर्राष्ट्रिय समाचार ३", image: "/scene.jpg" },
    { id: 4, title: "अन्तर्राष्ट्रिय समाचार ४", image: "/scene.jpg" },
  ],
  खेलकुद: [
    { id: 5, title: "खेलकुद समाचार १", image: "/scene.jpg" },
    { id: 6, title: "खेलकुद समाचार २", image: "/scene.jpg" },
    { id: 7, title: "खेलकुद समाचार ३", image: "/scene.jpg" },
    { id: 8, title: "खेलकुद समाचार ४", image: "/scene.jpg" },
  ],
  राजनीति: [
    { id: 9, title: "राजनीति समाचार १", image: "/scene.jpg" },
    { id: 10, title: "राजनीति समाचार २", image: "/scene.jpg" },
    { id: 11, title: "राजनीति समाचार ३", image: "/scene.jpg" },
    { id: 12, title: "राजनीति समाचार ४", image: "/scene.jpg" },
  ],
};

// SidebarProfile Component
const SidebarProfile = ({ title, image }) => (
  <Card sx={{ mb: 2, display: "flex", alignItems: "center", p: 1, boxShadow: 1 }}>
    <Avatar src={image} sx={{ width: 56, height: 56, mr: 2 }} />
    <Typography variant="body1" sx={{ fontWeight: 600 }}>
      {title}
    </Typography>
  </Card>
);

// Sidebar Component
const Sidebar = () => {
const [internationalNews, setInternationalNews] = useState([]);
 const navigate = useNavigate(); 

useEffect(()=>{
  const fetchNews = async () => {
    try{
      const response = await getAllNews();
      if(response.data && Array.isArray(response.data)){
        setInternationalNews(response.data);
      }
    }catch(error){
      console.error("Error fetching international News:", error)
    }
  };
  fetchNews();
}, []);

  return (
    <Box sx={{ p: 2, overflowY: "auto", height: "100vh", borderLeft: 1, borderColor: "divider" }}>
      {Object.keys(newsByCategory).map((category) => (
        <Box key={category} sx={{ mb: 4 }}>
          {/* Category Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              अन्तर्राष्ट्रिय
            </Typography>
             <IconButton onClick={() => navigate("/international")}>
            <ArrowCircleRightOutlinedIcon fontSize="small" color="action" />
          </IconButton>
          </Box>

          {/* List of 4 news per category */}
          {internationalNews.slice(0, 4).map((news) => (
          <SidebarProfile
            key={news.id}
            title={news.topic} // assuming API provides “topic” field
            image={`${backendUrl}/images/${news.image}`} // correct image path
          />
        ))}
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
