import React from "react";
import { Box, Card, CardContent, Avatar, Typography } from "@mui/material";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";

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
  return (
    <Box sx={{ p: 2, overflowY: "auto", height: "100vh", borderLeft: 1, borderColor: "divider" }}>
      {Object.keys(newsByCategory).map((category) => (
        <Box key={category} sx={{ mb: 4 }}>
          {/* Category Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {category}
            </Typography>
            <ArrowCircleRightOutlinedIcon fontSize="small" color="action" />
          </Box>

          {/* List of 4 news per category */}
          {newsByCategory[category].slice(0, 4).map((news) => (
            <SidebarProfile key={news.id} title={news.title} image={news.image} />
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Sidebar;
