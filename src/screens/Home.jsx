import React, { useEffect } from "react";
import { useUserAuth } from "../context/AuthContex";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography } from "@mui/material";
import { useUserEvents } from "../context/UserEventContext";
import EventCard from "../components/EventCard";

const Home = () => {
  const { user, isAuth, loading } = useUserAuth();
  const { getEventsController, events } = useUserEvents();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
    if (user.rol !== undefined && user.rol == "business") {
      navigate("/home/business");
    }
  }, [isAuth]);

  useEffect(() => {
    getEventsController();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  console.log(events);
  return (
    <Box>
      <Navbar />
      <Box className="MainContent" p={4}>
        <Box className="JoinEvents">
          <Typography variant="h5" fontWeight={"bold"} mt={2}>
            Your Next Events
          </Typography>
        </Box>

        <Box className="AllEvents">
          <Typography variant="h5" fontWeight={"bold"} my={2}>
            All Events
          </Typography>
          <Box className="Events">
            {events.map((event) => (
              <EventCard event={event} />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
