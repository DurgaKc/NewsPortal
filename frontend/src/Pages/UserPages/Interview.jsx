import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const sampleData = [
  {
    id: 1,
    topic: "Breaking News: अर्थशास्त्र",
    media: "/tiger.jpeg",
    description: "नेपालको अर्थतन्त्रबारे पछिल्लो अपडेट...",
    createdAt: "2025-10-13T06:30:00Z",
  },
  {
    id: 2,
    topic: "इजरायल-गाजा द्वन्द्व",
    media: "/roses.jpg",
    description:
      "नेपाल एक बहुसांस्कृतिक र बहुभाषिक देश हो जहाँ विभिन्न जातजाति, परम्परा र विश्वासहरू एउटै समाजमा समेटिएका छन्...",
    createdAt: "2025-10-14T03:00:00Z",
  },
  {
    id: 2,
    topic: "इजरायल-गाजा द्वन्द्व",
    media: "/roses.jpg",
    description:
      "नेपाल एक बहुसांस्कृतिक र बहुभाषिक देश हो जहाँ विभिन्न जातजाति, परम्परा र विश्वासहरू एउटै समाजमा समेटिएका छन्...",
    createdAt: "2025-10-14T03:00:00Z",
  },
  {
    id: 2,
    topic: "इजरायल-गाजा द्वन्द्व",
    media: "/roses.jpg",
    description:
      "नेपाल एक बहुसांस्कृतिक र बहुभाषिक देश हो जहाँ विभिन्न जातजाति, परम्परा र विश्वासहरू एउटै समाजमा समेटिएका छन्...",
    createdAt: "2025-10-14T03:00:00Z",
  },
  {
    id: 2,
    topic: "इजरायल-गाजा द्वन्द्व",
    media: "/roses.jpg",
    description:
      "नेपाल एक बहुसांस्कृतिक र बहुभाषिक देश हो जहाँ विभिन्न जातजाति, परम्परा र विश्वासहरू एउटै समाजमा समेटिएका छन्...",
    createdAt: "2025-10-14T03:00:00Z",
  },
  {
    id: 2,
    topic: "इजरायल-गाजा द्वन्द्व",
    media: "/roses.jpg",
    description:
      "नेपाल एक बहुसांस्कृतिक र बहुभाषिक देश हो जहाँ विभिन्न जातजाति, परम्परा र विश्वासहरू एउटै समाजमा समेटिएका छन्...",
    createdAt: "2025-10-14T03:00:00Z",
  },
  {
    id: 3,
    topic: "स्थानीय चुनाव अपडेट",
    media: "/birds.jpg",
    description: "चुनावका तयारी तीव्र गतिमा अघि बढ्दै...",
    createdAt: "2025-10-14T04:30:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/birds.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 4,
    topic: "आर्थिक सुधार योजना",
    media: "/roses.jpg",
    description: "सरकारले नयाँ आर्थिक रणनीति ल्याउने तयारीमा...",
    createdAt: "2025-10-14T05:00:00Z",
  },
  {
    id: 5,
    topic: "शिक्षा क्षेत्रमा सुधार",
    media: "/scene.jpg",
    description: "नयाँ पाठ्यक्रम विकास र शिक्षक तालिम सुरु...",
    createdAt: "2025-10-13T08:00:00Z",
  },
  {
    id: 5,
    topic: "शिक्षा क्षेत्रमा सुधार",
    media: "/scene.jpg",
    description: "नयाँ पाठ्यक्रम विकास र शिक्षक तालिम सुरु...",
    createdAt: "2025-10-13T08:00:00Z",
  },
  {
    id: 5,
    topic: "शिक्षा क्षेत्रमा सुधार",
    media: "/scene.jpg",
    description: "नयाँ पाठ्यक्रम विकास र शिक्षक तालिम सुरु...",
    createdAt: "2025-10-13T08:00:00Z",
  },
  {
    id: 5,
    topic: "शिक्षा क्षेत्रमा सुधार",
    media: "/scene.jpg",
    description: "नयाँ पाठ्यक्रम विकास र शिक्षक तालिम सुरु...",
    createdAt: "2025-10-13T08:00:00Z",
  },
  {
    id: 5,
    topic: "शिक्षा क्षेत्रमा सुधार",
    media: "/scene.jpg",
    description: "नयाँ पाठ्यक्रम विकास र शिक्षक तालिम सुरु...",
    createdAt: "2025-10-13T08:00:00Z",
  },
  {
    id: 5,
    topic: "शिक्षा क्षेत्रमा सुधार",
    media: "/scene.jpg",
    description: "नयाँ पाठ्यक्रम विकास र शिक्षक तालिम सुरु...",
    createdAt: "2025-10-13T08:00:00Z",
  },
  {
    id: 5,
    topic: "शिक्षा क्षेत्रमा सुधार",
    media: "/tiger.jpeg",
    description: "नयाँ पाठ्यक्रम विकास र शिक्षक तालिम सुरु...",
    createdAt: "2025-10-13T08:00:00Z",
  },
  {
    id: 5,
    topic: "शिक्षा क्षेत्रमा सुधार",
    media: "/tiger.jpeg",
    description: "नयाँ पाठ्यक्रम विकास र शिक्षक तालिम सुरु...",
    createdAt: "2025-10-13T08:00:00Z",
  },
];

const timeAgo = (date) => {
  const now = new Date();
  const diff = Math.floor((now - new Date(date)) / 1000);

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hrs ago`;
  return `${Math.floor(diff / 86400)} days ago`;
};

const Interview = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const firstPageItems = 20; // excluding the featured one
  const otherPageItems = 24;

  useEffect(() => {
    const sortedNews = [...sampleData].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
    setNews(sortedNews);
  }, []);

  // ✅ Featured news (only page 1)
  const featured = news[0];

  // ✅ Paginated items logic
  let paginatedItems = [];
  if (currentPage === 1) {
    paginatedItems = news.slice(1, firstPageItems + 1);
  } else {
    const startIndex = 1 + firstPageItems + (currentPage - 2) * otherPageItems;
    const endIndex = startIndex + otherPageItems;
    paginatedItems = news.slice(startIndex, endIndex);
  }

  // ✅ Total pages
  const remainingItems = news.length - 1 - firstPageItems;
  const totalPages =
    1 + Math.ceil(Math.max(0, remainingItems) / otherPageItems);

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <Box className="w-full p-5 pt-10">
      {/* ✅ Show Featured News Only on Page 1 */}
      {currentPage === 1 && featured && (
        <Grid
          container
          spacing={2}
          className="mb-10 border-b border-gray-300 pb-6"
        >
          <Grid item xs={12} md={7}>
            <img
              src={featured.media}
              alt={featured.topic}
              className="w-full h-100 object-cover rounded-lg"
            />
          </Grid>

          <Grid item xs={12} md={5}>
            <Box className="flex justify-end mt-2">
              <Box className="flex items-center gap-1 text-gray-500 text-sm mr-12">
                <AccessTimeIcon sx={{ fontSize: 16 }} />
                <Typography>{timeAgo(featured.createdAt)}</Typography>
              </Box>
            </Box>

            <Typography variant="h3" className="font-bold leading-snug">
              {featured.topic}
            </Typography>

            <Typography className="text-gray-700 text-base pt-6 line-clamp-3">
              {featured.description}
            </Typography>
          </Grid>
        </Grid>
      )}

      {/* ✅ News Grid */}
      <Grid container spacing={3}>
        {paginatedItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${item.id}-${index}`}>
            <Box className="flex flex-col gap-2">
              <img
                src={item.media}
                alt={item.topic}
                className="w-full h-90 object-cover rounded-lg"
              />

              <Typography variant="h5" className="font-semibold">
                {item.topic}
              </Typography>

              <Typography className="text-gray-700 text-sm line-clamp-2">
                {item.description}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* ✅ Pagination Buttons */}
      {/* ✅ Pagination Buttons (Right Aligned + Clean UI) */}
<Box className="flex justify-end items-center mt-8 gap-4 pr-4">
  <Button
    variant="contained"
    size="small"
    disabled={currentPage === 1}
    onClick={handlePrev}
    sx={{
      textTransform: "none",
      borderRadius: "8px",
      padding: "6px 16px",
    }}
  >
    Prev
  </Button>

  <Typography className="text-gray-700 font-medium">
    {currentPage} / {totalPages}
  </Typography>

  <Button
    variant="contained"
    size="small"
    disabled={currentPage === totalPages}
    onClick={handleNext}
    sx={{
      textTransform: "none",
      borderRadius: "8px",
      padding: "6px 16px",
    }}
  >
    Next
  </Button>
</Box>

    </Box>
  );
};

export default Interview;
