import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import EventCard from "./EventCard";

const MyEvents = ({ myEvents, limit }) => {
  // let myEvents = Events.myEvents;
  return (
    <Box className="Events">
      {myEvents.length > 0 ? (
        myEvents
          .slice(0, limit)
          .map((events) => <EventCard key={events.id} event={events} />)
      ) : (
        <Box
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="overline" my={2}>
            Looks like you don't have events early
          </Typography>
          <Typography variant="button">
            <Link
              style={{
                color: "#1565c0",
                cursor: "pointer",
              }}
            >
              Click to Explore all Events
            </Link>
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default MyEvents;
