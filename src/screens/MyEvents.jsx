import { Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { useUserEvents } from "../context/UserEventContext";
import { useEffect } from "react";
import MyEvents from "../components/MyEvents";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../context/AuthContex";

const MyEventsScreen = () => {
  const { getMyEventsController, myEvents } = useUserEvents();

  const { isAuth, loading } = useUserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        navigate("/");
      }
    }
  }, [isAuth, loading]);

  useEffect(() => {
    getMyEventsController();
  }, []);
  return (
    <Box>
      <Navbar where={"My Events"} />
      <Box className="My Events" p={4}>
        <Typography variant="h5" fontWeight={"bold"} my={2}>
          My events
          <Box className="Events" mt={2}>
            <MyEvents myEvents={myEvents} limit={20}></MyEvents>
          </Box>
        </Typography>
      </Box>
    </Box>
  );
};

export default MyEventsScreen;
