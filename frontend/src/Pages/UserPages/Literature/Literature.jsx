import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getAllLiterature, getCategories } from "../../AdminPages/Literature/LiteratureApi";
import { useNavigate } from "react-router-dom";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Literature = () => {
  const navigate = useNavigate();
  const categoryMap = {
    "कविता": "poem",
    "कथा": "story",
    "गजल": "ghazal",
    "मुक्तक": "muktak",
  };

  // Fetch all literature
  const { data: literatureResponse, isLoading: loadingLiterature } = useQuery({
    queryKey: ["literatureList"],
    queryFn: async () => {
      const res = await getAllLiterature();
      const activeItems = (res.data || []).filter(item => item.status === "active");
      return activeItems.map(item => ({
        ...item,
        slug: categoryMap[item.category] || item.category.toLowerCase()
      }));
    },
  });

  const literatureList = Array.isArray(literatureResponse) ? literatureResponse : [];

  // Fetch categories
  const { data: categoriesResponse, isLoading: loadingCategories } = useQuery({
    queryKey: ["literatureCategories"],
    queryFn: async () => {
      const res = await getCategories();
      return res.data || [];
    },
  });

  const categories = Array.isArray(categoriesResponse) ? categoriesResponse : [];

  if (loadingLiterature || loadingCategories) {
    return (
      <Box className="flex justify-center items-center h-screen">
        <CircularProgress />
      </Box>
    );
  }

  // Limit to 10 posts
  const limitedLiterature = literatureList.slice(0, 10);

  return (
    <Box className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <Box className="bg-gradient-to-r from-sky-700 to-blue-400 text-center text-white shadow-lg py-6">
        <Typography variant="h3" className="font-extrabold tracking-wide">
          साहित्य संसार
        </Typography>
        <Typography className="mt-3 text-lg opacity-90">
          कविता, गजल, कथा, मुक्तक र भावना
        </Typography>
      </Box>

      <Box className="flex w-full p-8 gap-8">
        {/* LEFT SECTION */}
        <Box className="flex-1 flex flex-col gap-8">
          {/* Literature Grid */}
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {limitedLiterature.map((item) => (
              <Card
                key={item._id}
                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white cursor-pointer"
                onClick={() => navigate(`/literature/${item._id}`)} // Navigate to detail page
              >
                <CardContent className="flex items-center gap-4">
                  {/* Circular Image */}
                  <img
                    src={item.image ? `${backendUrl}/images/${item.image}` : "/placeholder.jpg"}
                    alt={item.topic}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  {/* Text Content */}
                  <div>
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-800 hover:underline"
                    >
                      {item.category}: {item.topic}
                    </Typography>
                    <Typography className="text-gray-500 text-sm mt-1">लेखक: {item.author}</Typography>
                    <Typography className="text-gray-400 text-xs mt-1">
                      प्रकाशित मिति: {new Date(item.date).toLocaleDateString("ne-NP")}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* SIDEBAR */}
        <Box className="w-72 bg-white shadow-md rounded-xl p-5 h-fit">
          <Typography variant="h6" className="font-semibold mb-4 text-gray-800">
            श्रेणीहरू
          </Typography>

          <Box className="flex flex-col divide-y divide-gray-200">
            {/* Main categories */}
            {["कविता", "कथा", "गजल", "मुक्तक"].map((cat, index) => (
              <Button
                key={`main-${index}`}
                variant="text"
                className="flex justify-between w-full py-3 px-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all normal-case"
                onClick={() => navigate(`/literature/${categoryMap[cat]}`)}
              >
                <span>{cat}</span>
                <span className="text-xs text-gray-400 group-hover:text-purple-500">➜</span>
              </Button>
            ))}

            {/* Backend categories */}
            {categories
              .filter((cat) => !["कविता", "कथा", "गजल", "मुक्तक"].includes(cat))
              .map((cat, index) => {
                const slug = categoryMap[cat] || cat.toLowerCase();
                return (
                  <Button
                    key={`dynamic-${index}`}
                    variant="text"
                    className="flex justify-between w-full py-3 px-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all normal-case"
                    onClick={() => navigate(`/literature/${slug}`)}
                  >
                    <span>{cat}</span>
                    <span className="text-xs text-gray-400 group-hover:text-purple-500">➜</span>
                  </Button>
                );
              })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Literature;
