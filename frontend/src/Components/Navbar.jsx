import React, { useEffect, useState, useRef } from "react";
import { Box, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoPerson } from "react-icons/io5";
import HomeIcon from "@mui/icons-material/Home";
import NepaliDateTime from "./NepaliDateTime";
import Admin from "./UserLogin/admin";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  // ✅ Province dropdown refs
  const provinceBtnRef = useRef(null);
  const provinceRef = useRef(null);

  // ✅ Others dropdown refs
  const othersBtnRef = useRef(null);
  const othersRef = useRef(null);

  const navLinks = [
    { href: "/news", label: "समाचार" },
    { href: "/international", label: "अन्तर्राष्ट्रिय" },
    { href: "/politics", label: "राजनीति" },
    { href: "/local-government", label: "स्थानीय सरकार" },
    { href: "/sports", label: "खेलकुद" },
    { href: "/province", label: "प्रदेश" },
    { href: "/interview", label: "अन्तर्वार्ता" },
    { href: "/entertainment", label: "मनोरञ्जन" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      // ✅ Close province dropdown if clicked outside
      if (
        openDropdown === "province" &&
        provinceRef.current &&
        !provinceRef.current.contains(event.target) &&
        provinceBtnRef.current &&
        !provinceBtnRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }

      // ✅ Close others dropdown if clicked outside
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
      <Box className="nav w-full pt-3 pb-1 px-4 flex flex-col md:flex-row items-center justify-between">
        {/* Left side: Logo + Text */}
        <div className="flex items-center gap-3">
          <img
            src="/news.png"
            alt="Logo"
            className="w-38 h-28 object-contain"
          />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-700 to-red-600 bg-clip-text text-transparent animate-pulse">
            Sutra Sanchar
          </h1>
        </div>

        {/* Right side: Flag + Nepali DateTime */}
        <div className="flex items-center gap-4 mt-3 md:mt-0">
          <div className="hidden md:block">
            <img
              src="/flag.gif"
              className="h-20 w-16 object-contain"
              alt="Nepal Flag"
            />
          </div>
          <NepaliDateTime />
        </div>
      </Box>

      <Grid className="nav-links px-4 py-2 flex flex-col md:flex-row items-start md:items-center dark:bg-sky-700 text-white">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden mb-2"
        >
          {isMenuOpen ? <IoMdClose /> : <GiHamburgerMenu />}
        </button>
        <div className="flex w-full justify-between items-center">
          <ul
            className={`flex-col ${
              isMenuOpen ? "flex" : "hidden"
            } md:flex md:flex-row md:gap-6`}
          >
            <li>
              <Link to="/" className="mr-2 hover:text-orange-500 ml-10">
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

            {/* ✅ Others Dropdown */}
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
                  onClick={() => setOpenDropdown(null)}
                  className="absolute mt-2 w-32 bg-white shadow-lg z-50 dark:bg-sky-700 text-black dark:text-white"
                >
                  <Link
                    to="/education"
                    className="block px-4 py-2 hover:text-orange-500"
                  >
                    शिक्षा/प्रविधि
                  </Link>
                  <Link
                    to="/health"
                    className="block px-4 py-2 hover:text-orange-500"
                  >
                    स्वास्थ्य
                  </Link>
                  <Link
                    to="/blog"
                    className="block px-4 py-2 hover:text-orange-500"
                  >
                    ब्लग
                  </Link>
                  <Link
                    to="/literature"
                    className="block px-4 py-2 hover:text-orange-500"
                  >
                    साहित्य
                  </Link>
                  <Link
                    to="/lifestyle"
                    className="block px-4 py-2 hover:text-orange-500"
                  >
                    जीवनशैली
                  </Link>
                </div>
              )}
            </li>

            <li className="flex items-center hover:text-black cursor-pointer">
              <IoPerson className="mt-1 mr-1" />
              <Link to="/admin" className="mr-8">
                Login
              </Link>
            </li>
          </ul>
          {/* Right Side: Admin Section */}
          <div className="flex items-center justify-end">
            <Admin/>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Navbar;
