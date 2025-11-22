import React from "react";
import RecentNews from "./RecentNews";
import Heading from "./Heading";
import { Box, Grid } from "@mui/material";
import LatestNews from "./LatestNews"; // Import the LatestNews component
import PopupBanner from "../../../Components/PopupBanner";

const Main = () => {
  return (
    <Box sx={{ p: 1, flexGrow: 1 }}>
      <PopupBanner />
      <LatestNews />

      <Grid container spacing={2}>
        {/* Left side: RecentNews */}
        <Grid item xs={12} md={7.5}>
          <RecentNews />
        </Grid>

        {/* Right side: Heading */}
        <Grid item xs={12} md={4.4}>
          <Heading />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Main;
