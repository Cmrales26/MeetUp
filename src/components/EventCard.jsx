import React from "react";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

const EventCard = ({ event }) => {
  return (
    <Link
      to={`/event/${event.id}`}
      className="Event"
      style={{
        backgroundColor: "#1c172e",
        borderRadius: "10px",
        color: "#fafafa",
        textDecoration: "none",
      }}
      width={"400px"}
      key={event.id}
    >
      <Box key={event.id}>
        {/* <img
          src="https://images.ctfassets.net/spoqsaf9291f/4iLLoSt2nvqWtAfanxBdEP/c6fb3d1680c155138a08f2f138a2812f/template-gallery-relaunch__1_.png"
          alt="Template Image"
          width={"100%"}
          height={"200px"}
          style={{ objectFit: "cover" }}
        /> */}
      </Box>
      <Typography variant="body1" fontWeight={"bold"} p={2}>
        {event.name}
      </Typography>
      <Box display={"flex"} justifyContent={"space-between"} px={2}>
        <Box>
          <Typography variant="body2" color={"#f5b400"}>
            {event.business_name}
          </Typography>
        </Box>
        <Box display={"flex"} gap={1}>
          <Typography variant="body2">{event.location}</Typography>
        </Box>
      </Box>
      <Box p={2}>
        <Typography variant="body2">{event.description}</Typography>
      </Box>

      <Box className="Footer">
        <Box display={"flex"} justifyContent={"space-between"} px={2} pb={2}>
          <Box display="flex" alignItems="center">
            <AccessAlarmsIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" color={"#f5b400"}>
              {event.time}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <CalendarMonthIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" color={"#f5b400"}>
              {event.date}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Link>
  );
};

export default EventCard;
