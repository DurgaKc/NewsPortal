import React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Sidebar from "../../Components/Sidebar";

const newsData = [
  {
    id: 1,
    topic:
      "अस्थायी र करार कर्मचारी हटाउने मुसीकोटका निर्णयमा माओवादी केन्द्र मुसीकोटको आपत्ति",
    image: "/scene.jpg",
    createdAt: "2025-10-15T06:30:00Z",
    description:
      "यो समाचारको विवरण। यहाँ लामो विवरण राख्न सकिन्छ जुन मुख्य समाचारसँग सम्बन्धित छ।",
  },
  {
    id: 2,
    topic:
      "मैले पार्टी भित्र उठाएको कुराको अहिले आएर पुष्टि भएको छ: उपमहासचिव शर्मा",
    image: "/scene.jpg",
    createdAt: "2025-10-14T09:00:00Z",
  },
  {
    id: 2,
    topic:
      "मैले पार्टी भित्र उठाएको कुराको अहिले आएर पुष्टि भएको छ: उपमहासचिव शर्मा",
    image: "/scene.jpg",
    createdAt: "2025-10-14T09:00:00Z",
  },
  {
    id: 2,
    topic:
      "मैले पार्टी भित्र उठाएको कुराको अहिले आएर पुष्टि भएको छ: उपमहासचिव शर्मा",
    image: "/scene.jpg",
    createdAt: "2025-10-14T09:00:00Z",
  },
  // Add more news objects...
];

const timeAgo = (date) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000 / 60);
  if (diff < 60) return `${diff} minutes ago`;
  const hr = Math.floor(diff / 60);
  return `${hr} hours ago`;
};

const Education = () => {
  return (
    <Box className="flex w-full h-screen">
      {/* LEFT SECTION */}
      <Box className="w-full p-4 overflow-y-auto">
        {/* Top news item full width */}
        {newsData.slice(0, 1).map((item) => (
          <Box
            key={item.id}
            className="mb-8 flex flex-col md:flex-row gap-4 items-start"
          >
            {/* LEFT: Image */}
            <img
              src={item.image}
              alt={item.topic}
              className="w-full md:w-1/2 h-80 md:h-90 object-cover rounded-lg"
            />

            {/* RIGHT: Time  + Topic */}

            <Box className="flex flex-col justify-between md:w-1/2">
              <Box className="flex items-center gap-2 text-gray-500 text-sm mt-auto mr-6 self-end">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography>{timeAgo(item.createdAt)}</Typography>
              </Box>
              <Typography variant="h4" className="font-bold pt-6">
                {item.topic}
              </Typography>

              {item.description && (
                <Typography className="text-gray-700 text-base mb-2 line-clamp-3 pt-6">
                  {item.description}
                </Typography>
              )}
            </Box>
          </Box>
        ))}

        {/* Remaining news items in smaller cards */}
        <Box sx={{ display: "flex", gap: 2, height: "calc(100vh - 32px)" }}>
          {/* LEFT: News List */}
          <Box
            sx={{
              flex: 2,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {newsData.slice(1).map((item) => (
              <Card key={item.id} sx={{ display: "flex", overflow: "hidden" }}>
                <Box
                  component="img"
                  src={item.image}
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
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.topic}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                    }}
                  >
                    <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
                    <Typography variant="caption">
                      {timeAgo(item.createdAt)}
                    </Typography>
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

export default Education;
