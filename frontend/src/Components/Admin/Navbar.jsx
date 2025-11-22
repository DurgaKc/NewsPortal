import React, { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import HomeIcon from "@mui/icons-material/Home";
import NepaliDateTime from "../NepaliDateTime";
import Admin from "./Admin";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const provinceBtnRef = useRef(null);
  const provinceRef = useRef(null);
  const othersBtnRef = useRef(null);
  const othersRef = useRef(null);

  const navLinks = [
    { href: "advertisement", label: "विज्ञापन" },
    { href: "latestnews", label: "ताजा समाचार" },
    { href: "interlist", label: "अन्तर्राष्ट्रिय" },
    { href: "politics", label: "राजनीति" },
    { href: "local-government", label: "स्थानीय सरकार" },
    { href: "sports", label: "खेलकुद" },
    { href: "province", label: "प्रदेश" },
    { href: "interview", label: "अन्तर्वार्ता" },
    { href: "entertainment", label: "मनोरञ्जन" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openDropdown === "province" &&
        provinceRef.current &&
        !provinceRef.current.contains(event.target) &&
        provinceBtnRef.current &&
        !provinceBtnRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }

      if (
        openDropdown === "others" &&
        othersRef.current &&
        !othersRef.current.contains(event.target) &&
        othersBtnRef.current &&
        !othersBtnRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

  return (
    <Grid>
      {/* Top Header */}
      <Box className="w-full pt-3 pb-1 px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/news.png" alt="Logo" className="w-38 h-28 object-contain" />
           <div className="flex flex-col">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent animate-pulse">
              Sutra Sanchar
            </h1>

            <p className="dark:text-sky-700 font-medium  text-sky-800 text-lg mt-1">
              तथ्यमा आधारित, सत्यमा केन्द्रित
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-3 md:mt-0">
          {/* <div className="hidden md:block">
            <img src="/flag.gif" className="h-20 w-16 object-contain" alt="Nepal Flag" />
          </div> */}
          <NepaliDateTime />
        </div>
      </Box>

      {/* Navigation Bar */}
      <Grid className="px-4 py-2 flex flex-col md:flex-row items-start md:items-center dark:bg-sky-700 text-white">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden mb-2"
        >
          {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>

        {/* Main Navigation + Admin */}
        <div className="flex w-full justify-between items-center">
          {/* Left Side Links */}
          <ul
            className={`flex-col ${
              isMenuOpen ? "flex" : "hidden"
            } md:flex md:flex-row md:gap-6`}
          >
            <li>
              <Link to="/admin" className="mr-2 hover:text-orange-500 ml-10">
                <HomeIcon />
              </Link>
            </li>

            {navLinks.map((link, idx) => (
              <li key={idx}>
                <Link to={link.href} className="hover:text-orange-500">
                  {link.label}
                </Link>
              </li>
            ))}

            {/* Others Dropdown */}
            <li className="relative">
              <button
                type="button"
                ref={othersBtnRef}
                onClick={() =>
                  setOpenDropdown(openDropdown === "others" ? null : "others")
                }
                className="inline-flex items-center hover:text-orange-500"
              >
                अन्य <RiArrowDropDownLine className="text-2xl ml-1" />
              </button>

              {openDropdown === "others" && (
                <div
                  ref={othersRef}
                  className="absolute mt-2 w-32 bg-white shadow-lg z-50 dark:bg-sky-700 text-black dark:text-white"
                >
                  {[
                    ["education", "शिक्षा/प्रविधि"],
                    ["health", "स्वास्थ्य"],
                    ["blog", "ब्लग"],
                    ["literature", "साहित्य"],
                    ["lifestyle", "जीवनशैली"],
                  ].map(([href, label]) => (
                    <Link
                      key={href}
                      to={`${href}`}
                       onClick={() => setOpenDropdown(null)}
                      className="block px-4 py-2 hover:text-orange-500"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          </ul>

          {/* Right Side: Admin Section */}
          <div className="flex items-center justify-end">
            <Admin />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Navbar;
