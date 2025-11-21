import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import { getAllNews } from "../../AdminPages/International/InterApi";
import { getAllPolitics } from "../../AdminPages/Politics/PoliticsApi";
import { getAllSports } from "../../AdminPages/Sports/SportsApi";
import { getAllLocalGovernment } from "../../AdminPages/LocalGovernment/LocalGovernmentApi";
import { getAllEntertainment } from "../../AdminPages/Entertainment/EntertainmentApi";
import { getAllLiterature } from "../../AdminPages/Literature/LiteratureApi";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const CurrentNews = () => {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const [intlRes, polRes, sportsRes, localGovRes, entRes, litRes] =
          await Promise.all([
            getAllNews(),
            getAllPolitics(),
            getAllSports(),
            getAllLocalGovernment(),
            getAllEntertainment(),
            getAllLiterature(),
          ]);

        const getActive = (data, type) =>
          data
            .filter((i) => i.status === "active" || i.status === true)
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, 4) // 4 news per section
            .map((i) => ({ ...i, type }));
        console.log("International response:", intlRes.data);

        setSections({
          अन्तर्राष्ट्रिय: getActive(intlRes.data, "international"),
          राजनीति: getActive(polRes.data, "politics"),
          खेलकुद: getActive(sportsRes.data, "sports"),
          स्थानीयसरकार: getActive(localGovRes.data, "local-government"),
          मनोरञ्जन: getActive(entRes.data, "entertainment"),
          साहित्य: getActive(litRes.data, "literature"),
        });
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const getRoute = (story) => `/${story.type}/${story._id}`;

  if (loading)
    return <Typography className="p-4 text-gray-500">Loading...</Typography>;

  return (
    <Box className="flex flex-col gap-10 py-6">
      {Object.entries(sections).map(([sectionName, items]) => (
        <Box key={sectionName} className="flex flex-col w-full">
          {/* Section Heading */}
          <Box className="flex items-center mb-6">
            <Box className="flex-1 h-px bg-gray-300"></Box>
            <Typography
              variant="h5"
              className="font-bold text-gray-800 uppercase px-4 tracking-wide text-center"
            >
              {sectionName}
            </Typography>
            <Box className="flex-1 h-px bg-gray-300"></Box>
          </Box>

          {/* News Grid: 2 per row */}
          <Box className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((story) => (
              <Link
                key={story._id}
                to={getRoute(story)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <Box className="bg-white shadow-md rounded-xl p-3 hover:shadow-lg transition-all flex flex-col">
                  {/* IMAGE */}
                  <img
                    src={
                      story.image
                        ? `${backendUrl}/images/${story.image}`
                        : "/placeholder.jpg"
                    }
                    alt={story.topic}
                    className="w-full h-80 rounded-lg object-cover mb-3"
                  />

                  {/* title */}
                  <Typography
                    variant="h6"
                    className="font-semibold text-gray-900 text-center"
                  >
                    {story.topic}
                  </Typography>
                </Box>
              </Link>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default CurrentNews;
