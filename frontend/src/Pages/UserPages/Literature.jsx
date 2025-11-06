import React from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";

const featured = {
  title: "गजल: सम्झनाको छायाँ",
  author: "लेखक: हरिवंश आचार्य",
  image: "/scene.jpg",
  description:
    "सम्झनाहरू कहिलेकाहीँ बिर्सन खोज्दा झनै गहिरिँदै जान्छन्। त्यो एक पलको भेट, त्यो एक अक्षरको स्पर्श, अनि त्यो भावनाको घाउ...",
};

const literatureList = [
  {
    id: 1,
    title: "मुक्तक: मनको आवाज",
    image: "/roses.jpg",
    author: "शिवशंकर अधिकारी",
    createdAt: "2025-01-10",
  },
  {
    id: 2,
    title: "कविता: आकाश र सपना",
    image: "/birds.jpg",
    author: "मञ्जु काफ्ले",
    createdAt: "2025-01-08",
  },
  {
    id: 3,
    title: "कथा: अधुरो पत्र",
    image: "/tiger.jpeg",
    author: "दुर्गा बराल",
    createdAt: "2025-01-05",
  },
  {
    id: 4,
    title: "गजल: आँखा र रहर",
    image: "/scene.jpg",
    author: "युवराज न्यौपाने",
    createdAt: "2024-12-26",
  },
];

const categories = ["कविता", "कथा", "गजल", "मुक्तक", "निबन्ध", "गीत"];

const Literature = () => {
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
          {/* Featured Section */}
          <Card className="flex flex-col md:flex-row rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full md:w-1/2 h-72 object-cover"
            />
            <CardContent className="flex flex-col justify-between md:w-1/2 p-6">
              <Typography variant="h5" className="font-bold mb-1 text-gray-800">
                {featured.title}
              </Typography>
              <Typography className="text-gray-500 mb-3">
                {featured.author}
              </Typography>
              <Typography className="text-gray-700 line-clamp-3 mb-5 leading-relaxed">
                {featured.description}
              </Typography>
              <Button
                variant="contained"
                startIcon={<MenuBookIcon />}
                className="bg-blue-600 hover:bg-blue-700 normal-case rounded-lg shadow-md"
              >
                थप पढ्नुहोस्
              </Button>
            </CardContent>
          </Card>

          {/* Literature Grid */}
          <Box className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {literatureList.map((item) => (
              <Card
                key={item.id}
                className="rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white"
              >
                <CardContent className="flex items-center gap-4">
                  {/* Circular Image */}
                  <img
                    src={item.image} // Make sure item.image has the image path
                    alt={item.title}
                    className="w-16 h-16 rounded-full object-cover"
                  />

                  {/* Text Content */}
                  <div>
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-800"
                    >
                      {item.title}
                    </Typography>
                    <Typography className="text-gray-500 text-sm mt-1">
                      {item.author}
                    </Typography>
                    <Typography className="text-gray-400 text-xs mt-1">
                      प्रकाशित मिति: {item.createdAt}
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
            {categories.map((cat, index) => (
              <Button
                key={index}
                variant="text"
                className="flex justify-between w-full py-3 px-2 text-gray-700 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-all normal-case"
              >
                <span>{cat}</span>
                <span className="text-xs text-gray-400 group-hover:text-purple-500">
                  ➜
                </span>
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Literature;
