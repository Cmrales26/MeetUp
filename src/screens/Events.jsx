import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useUserEvents } from "../context/UserEventContext";
import { useUserAuth } from "../context/AuthContex";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const { getEventsController, events } = useUserEvents();
  const { isAuth, loading } = useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        navigate("/");
      }
    }
  }, [loading]);

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
