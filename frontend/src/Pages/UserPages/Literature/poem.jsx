import React from "react";
import { Box, Card, CardContent, Typography, Button, CircularProgress } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getAllLiterature } from "../../AdminPages/Literature/LiteratureApi";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const PoemList = () => {
  const navigate = useNavigate();

  // Fetch all literature
  const { data: literatureResponse, isLoading } = useQuery({
    queryKey: ["literature"],
    queryFn: async () => {
      const res = await getAllLiterature();
      // Filter only active poems
      return res.data.filter((item) => 
        item.category === "Poem" && item.status === "active"
      
      );
    },
  });

  const poems = Array.isArray(literatureResponse) ? literatureResponse : [];

  if (isLoading) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  if (!poems || poems.length === 0) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <Typography variant="h6" className="text-gray-500">
          No active poems found
        </Typography>
      </Box>
    );
  }

  return (
    <Box className="flex flex-col min-h-screen bg-gray-50 p-6">
      <Link to="/literature" style={{ textDecoration: "none" }}>
        <Button
          variant="outlined"
          size="small"
          sx={{
            textTransform: "none",
            fontSize: "0.8rem",
            padding: "3px 10px",
            borderRadius: "8px",
            borderColor: "#1976d2",
            color: "#1976d2",
            "&:hover": {
              backgroundColor: "rgba(25, 118, 210, 0.1)",
              borderColor: "#1565c0",
            },
            marginBottom: "20px",
          }}
        >
          ← Back to Literature
        </Button>
        </Link>
      {/* Header */}
      <Box className="text-center mb-6">
        <Typography variant="h3" className="font-extrabold text-gray-800">
          कविता संग्रह
        </Typography>
        <Typography className="text-gray-500 mt-2">
          शीर्षक, लेखक र प्रकाशन मिति सहित
        </Typography>
      </Box>

      {/* Poems Grid - 4 cards per row */}
      <Box className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {poems.map((poem) => (
          <Card
            key={poem._id}
            className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-white flex flex-col"
          >
            {/* Image */}
            {poem.image ? (
              <img
                src={poem.image ? `${backendUrl}/images/${poem.image}`:"/placeholder.jpg"}
                alt={poem.topic}
                className="w-full h-48 object-cover"
              />
            ) : (
              <Box className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                No Image
              </Box>
            )}

            {/* Text Content */}
            <CardContent className="flex flex-col flex-grow p-4">
              <Typography variant="h6" className="font-bold text-gray-800 line-clamp-2">
                {poem.topic}
              </Typography>
              <Typography className="text-gray-500 mt-1 text-sm">
                लेखक : {poem.author}
              </Typography>
              <Typography className="text-gray-400 text-xs mt-1">
                प्रकाशित मिति: {new Date(poem.date).toLocaleDateString("ne-NP")}
              </Typography>

              <Button
                variant="contained"
                startIcon={<MenuBookIcon />}
                className="mt-4 bg-blue-600 hover:bg-blue-700 normal-case rounded-lg text-sm"
                onClick={() => navigate(`/literature/${poem._id}`)}
                size="small"
              >
                थप पढ्नुहोस्
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PoemList;