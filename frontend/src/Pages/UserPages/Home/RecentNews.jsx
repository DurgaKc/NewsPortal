import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const sampleData = [
  {
    id: 1,
    topic: "Breaking News: अर्थशास्त्र",
    media:  "/tiger.jpeg",
    description: "नेपालको अर्थतन्त्रबारे पछिल्लो अपडेट...",
     createdAt: "2025-10-13T06:30:00Z",
    // createdAt: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
  },
  {
    id: 2,
    topic: "इजरायल-गाजा द्वन्द्व",
    media: "/news.png",
    description: "नेपाल एक बहुसांस्कृतिक र बहुभाषिक देश हो जहाँ विभिन्न जातजाति, परम्परा र विश्वासहरू एउटै समाजमा समेटिएका छन्। पहाड, तराई र हिमालका बस्तीहरूमा बसोबास गर्ने मानिसहरूको जीवनशैली, बोलिचाली र उत्सवहरूमा फरकपन भए पनि आपसी सद्भाव र सहअस्तित्वको भावना बलियो छ। पछिल्ला वर्षहरूमा शिक्षा, स्वास्थ्य, संचार र पूर्वाधारको विकाससँगै ग्रामीण क्षेत्रहरूमा उल्लेखनीय परिवर्तन आइरहेका छन्।",
    createdAt: "2025-10-14T03:00:00Z",
    // createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
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


const RecentNews = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [news, setNews] = useState([]);

  useEffect(() => {
  setNews(sampleData);

  const interval = setInterval(() => {
    setCurrentTime(new Date());
  }, 60000); // updates every minute

  return () => clearInterval(interval);
}, []);


  return (
    <>
    <Box className="w-full max-w-4xl p-4">
      {news.map((item) => (
        <Box
          key={item.id}
          className="mb-8 border-b border-gray-300 pb-6 flex flex-col items-center gap-3"
        >
          {/* ✅ Topic */}
          <Typography variant="h3" className="font-bold text-2xl text-center">
            {item.topic}
          </Typography>

          {/* ✅ Dynamic Time */}
          <Box className="flex items-center gap-1 text-gray-500 text-sm mr-6 self-end">
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <Typography>{timeAgo(item.createdAt)}</Typography>
          </Box>

          {/* ✅ Photo */}
          <img
            src={item.media}
            alt={item.topic}
            className="w-full h-120 object-cover rounded-lg"
          />

          {/* ✅ Description */}
          <Typography className="text-gray-700 text-base text-justify">
            {item.description}
          </Typography>
         
        </Box>
        
      ))}
    </Box> 
    </>
  );
};

export default RecentNews;
