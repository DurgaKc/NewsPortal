import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const stories = [
  { img: "/tiger.jpeg", label: "इजरायल-गाजा द्वन्द्व" },
  { img: "/news.png", label: "विपिन जोशी" },
  { img: "/img3.jpg", label: "जेनजी विद्रोह" },
  { img: "/img4.jpg", label: "इजरायल" },
  { img: "/img5.jpg", label: "अर्थशास्त्र" },
];

const CurrentNews = () => {
  return (
    <Box className="w-full overflow-x-auto py-2">
      <Box className="flex gap-8 px-4 items-center">
        {stories.map((story, index) => (
          <Box key={index} className="flex items-center gap-2">
  <Avatar
    src={story.img}
    alt={story.label}
    sx={{ width: 55, height: 55 }}
    className="border border-gray-300"
  />
  <Typography
    variant="body2"
    className="text-sm text-gray-800 whitespace-nowrap"
  >
    {story.label}
  </Typography>
</Box>

        ))}
      </Box>
    </Box>
  );
};

export default CurrentNews;
