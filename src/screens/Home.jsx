import React, { useEffect } from "react";
import { useUserAuth } from "../context/AuthContex";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Box, Typography } from "@mui/material";
import { useUserEvents } from "../context/UserEventContext";
import EventCard from "../components/EventCard";
import MyEvents from "../components/MyEvents";

const Home = () => {
  const { user, isAuth, loading } = useUserAuth();
  const { getEventsController, events, getMyEventsController, myEvents } =
    useUserEvents();
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

  useEffect(() => {
    getMyEventsController();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box>
      <Navbar where={"Home"} />
      <Box className="MainContent" p={4}>
        <Box className="JoinEvents">
          <Typography variant="h5" fontWeight={"bold"} my={2}>
            Your Next Events
            <Box className="Events" mt={2}>
              <MyEvents myEvents={myEvents} limit={3}></MyEvents>
            </Box>
          </Typography>
        </Box>

        <Box className="AllEvents" mt={5}>
          <Typography variant="h5" fontWeight={"bold"} my={2}>
            Some Events
          </Typography>
          <Box className="Events">
            {events.slice(0, 6).map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </Box>
        </Box>

        <Box mt={5}>
          <Typography fontWeight={"bold"} variant="h5">
            Categories
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
