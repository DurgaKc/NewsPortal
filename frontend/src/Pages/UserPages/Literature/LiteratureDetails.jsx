import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Grid } from "@mui/material";
import { getLiteratureById } from "../../AdminPages/Literature/LiteratureApi"; // Adjust import path as needed
const backendUrl = import.meta.env.VITE_BACKEND_URL;

const LiteratureDetails = () => {
    const navigate = useNavigate()
  const { id } = useParams();
  const [literature, setLiterature] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiterature = async () => {
      try {
        const response = await getLiteratureById(id);
        setLiterature(response);
      } catch (error) {
        console.error("Error fetching literature detail:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLiterature();
  }, [id]);

  if (loading)
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );

  if (!literature)
    return (
      <Box className="flex justify-center items-center h-96">
        <Typography variant="h6">Literature not found.</Typography>
      </Box>
    );

  return (
    <Box className="p-6 md:p-10">
   
        <Button
        onClick={()=>navigate(-1)}
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
          ← Back
        </Button>
     

      <Grid container spacing={2} className="mb-6">
        {/* 🖼️ Left side: image */}
        <Grid item xs={12} md={4}>
          <img
            src={literature.image ? `${backendUrl}/images/${literature.image}` : "/placeholder.jpg"}
            alt={literature.topic}
            className="w-full h-60 object-cover rounded-lg shadow-md"
          />
        </Grid>

        {/* 📰 Right side: topic + author + date */}
        <Grid item xs={12} md={8}>
          <Box className="flex flex-col justify-start h-full gap-2 relative">
            {/* 🕒 Date at top-right */}
            <Box className="absolute top-0 right-0 flex items-center gap-1 text-gray-600">
             
              <Typography variant="body2">
               प्रकाशित मिति: {new Date(literature.date).toLocaleDateString("ne-NP")}
              </Typography>
            </Box>

            {/* Topic */}
            <Typography variant="h5" className="font-semibold pt-10">
              {literature.topic}
            </Typography>

            {/* Author */}
            {literature.author && (
              <Typography variant="h6" className="text-gray-600">
                 लेखक: {literature.author}
              </Typography>
            )}

            
          </Box>
        </Grid>
      </Grid>

      {/* Description */}
      {literature.description && (
        <Typography className="text-gray-700 text-sm leading-relaxed pt-4">
          {literature.description}
        </Typography>
      )}

      {/* Content - if you have a separate content field */}
      {literature.content && (
        <Box className="mt-6">
          <Typography variant="h6" className="font-semibold mb-2">
            Content
          </Typography>
          <Typography className="text-gray-700 leading-relaxed whitespace-pre-line">
            {literature.content}
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default LiteratureDetails;