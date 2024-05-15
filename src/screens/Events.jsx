import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useUserEvents } from "../context/UserEventContext";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

const Events = () => {
  const { getEventsController, events } = useUserEvents();

  useEffect(() => {
    getEventsController();
  }, []);
  return (
    <Box>
      <Navbar where={"Explore"} />
      <Box className="My Events" p={4}>
        <Box className="AllEvents">
          <Typography variant="h5" fontWeight={"bold"} my={2}>
            All Events
          </Typography>
          <Box className="Events">
            {events.slice(0, 20).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Events;
