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
          <Typography variant="h6" className="font-bold mb-3">
            About NewsPortal
          </Typography>
          <Typography className="text-gray-300 text-sm">
            Stay updated with the latest news from Nepal and around the world.
            We deliver breaking news, in-depth analysis, and reliable reporting.
          </Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className="font-bold mb-3">
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
              href="/world"
              underline="none"
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
            >
              World
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
              href="/business"
              underline="none"
              sx={{
                color: "white",
                "&:hover": { color: "white" },
              }}
            >
              Business
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
        <Grid item xs={12} md={4}>
          <Typography variant="h6" className="font-bold mb-3">
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
      </Grid>

      {/* Footer Bottom */}
      <Box className="mt-8 border-t border-gray-700  pt-4 text-center text-gray-300 text-lg">
        © {new Date().getFullYear()} NewsPortal. All rights reserved.
      </Box>
    </Box>
  );
};

export default Footer;
