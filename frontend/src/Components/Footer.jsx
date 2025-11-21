import React from "react";
import { Box, Typography, Link, Grid, IconButton } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";
import YouTubeIcon from "@mui/icons-material/YouTube";

const Footer = () => {
  return (
    <Box className="dark:bg-sky-700 text-white py-10 px-5">
      <Grid container spacing={4} className="max-w-7xl mx-auto">
        {/* About Section */}
        <Grid item xs={12} md={4}>
          <Typography variant="h5" className="font-bold mb-3">
            Sutra Sanchar
          </Typography>
          <div className=" mb-3">
            Sanamdristi Media Pvt.Ltd.
          </div>
          <div className="mb-3">
            Reg No:353432/81/82 OCR Nepal
          </div>
          <div className="mb-3">
            Musikot, Rukum(west) Nepal
          </div>
          <div className="mb-3">
            Musikot, Rukum(west) Nepal
          </div>
          <div className="mb-3">
            Tel:- +9779868664821
          </div>
          <div sx={{ pl: 6 }} className=" mb-3 ">
            +9779866170893
          </div>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={2}>
          <Typography variant="h5" className="font-bold mb-3">
            Quick Links
          </Typography>
          <Box className="flex flex-col gap-1">
            <Link
              href="/"
              underline="none"
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
            >
              Home
            </Link>
            <Link
              href="/aboutus"
              underline="none"
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
            >
              About Us
            </Link>
            <Link
              href="/advertisement"
              underline="none"
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
            >
              Advertisement
            </Link>
            <Link
              href="/politics"
              underline="none"
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
            >
              Politics
            </Link>
            <Link
              href="/terms"
              underline="none"
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
            >
              Terms  And Conditions
            </Link>
            <Link
              href="/contact"
              underline="none"
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
            >
              Contact Us
            </Link>
          </Box>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} md={3}>
          <Typography variant="h5" className="font-bold mb-3">
            Follow Us
          </Typography>
          <Box className="flex">
            <IconButton
              href="https://facebook.com"
              target="_blank"
              sx={{
                color: "white",
              }}
            >
              <Facebook sx={{ fontSize: 30 }} />
            </IconButton>

            <IconButton
              href="https://twitter.com"
              target="_blank"
              sx={{
                color: "white",
              }}
            >
              <Twitter />
            </IconButton>
            <IconButton
              href="https://instagram.com"
              target="_blank"
              sx={{
                color: "white",
              }}
            >
              <Instagram sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton
              href="https://linkedin.com"
              target="_blank"
              sx={{
                color: "white",
              }}
            >
              <LinkedIn sx={{ fontSize: 30 }} />
            </IconButton>
            <IconButton
              href="https://youtube.com"
              target="_blank"
              sx={{
                color: "white",
              }}
            >
              <YouTubeIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Box>
        </Grid>
        <Grid item xs={12} md={3}>
          <Typography variant="h5" className="font-bold pb-5 text-center">
            Our Team
          </Typography>
          <Box className="grid grid-cols-2 gap-4 text-center">
            <Box>
              <div className="font-semibold">सम्पादक</div>
              <div>अनिश के.सी.</div>
            </Box>

            <Box>
              <div className="font-semibold">प्रबन्ध निर्देशक</div>
              <div>अनिश के.सी.</div>
            </Box>
          </Box>

          {/* View All placed outside the grid but inside the same Grid item */}
          <Typography variant="h5" className="font-bold pt-5 pb-5 text-center mt-4">
            View All
          </Typography>
        </Grid>
      </Grid>

      {/* Footer Bottom */}
      <Box className="mt-8 border-t border-gray-700  pt-4 text-center text-gray-300 text-lg">
        Copyright©{new Date().getFullYear()} SutraSanchar. All rights reserved.
      </Box>
    </Box>
  );
};

export default Footer;
