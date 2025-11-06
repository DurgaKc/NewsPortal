import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import NepaliDate from "nepali-date-converter";

const NepaliDateTime = () => {
  const [dateTime, setDateTime] = useState({
    bsDate: "",
    nepaliTime: "",
    nepaliSambat: "",
    engDate: "",
  });

  const updateDateTime = () => {
    const now = new Date();

    // English date
    const engYear = now.getFullYear();
    const engMonth = (now.getMonth() + 1).toString().padStart(2, "0");
    const engDay = now.getDate().toString().padStart(2, "0");
    const englishDate = `AD: ${engMonth}/${engDay}/${engYear}`;

    // Nepali date
    const nepDate = new NepaliDate(now);
    const bsYear = nepDate.getYear();
    const bsMonth = nepDate.getMonth() + 1;
    const bsDay = nepDate.getDate();
    const nepaliWeekdays = [
      "आइतबार",
      "सोमबार",
      "मङ्गलबार",
      "बुधबार",
      "बिहिबार",
      "शुक्रबार",
      "शनिबार",
    ];
    const weekday = nepaliWeekdays[now.getDay()];

    // Time
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");

    // Nepal Sambat example conversion
    const nepalSambatYear = bsYear - 880;
    const nepalSambat = `${nepalSambatYear} कौला ङशि - ${bsDay}`;

    setDateTime({
      bsDate: `वि.सं: ${bsYear} असोज ${bsDay} गते ${weekday}`,
      nepaliTime: `${hours}:${minutes}:${seconds} बजे`,
      nepaliSambat: `नेपाल संवत: ${nepalSambat}`,
      engDate: englishDate,
    });
  };

  useEffect(() => {
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <Box className="dark:text-sky-700 p-4">
      <Typography variant="body1" className="font-semibold">
        {dateTime.bsDate}, {dateTime.nepaliTime}
      </Typography>
      <Typography variant="body1">{dateTime.nepaliSambat}</Typography>
      <Typography variant="body1" className="mt-1">
        {dateTime.engDate}
      </Typography>
    </Box>
  );
};

export default NepaliDateTime;
