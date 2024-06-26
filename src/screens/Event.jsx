import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useUserEvents } from "../context/UserEventContext";
import { Box, Button, Typography } from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useUserAuth } from "../context/AuthContex";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import EventBusyIcon from "@mui/icons-material/EventBusy";
import Navbar from "../components/Navbar";
const Event = () => {
  let { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [isJoin, setIsJoin] = useState(false);

  const navigate = useNavigate();

  const { isAuth, loading } = useUserAuth();
  const { getEventController, joinEventController, leaveEventController } =
    useUserEvents();

  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        navigate("/");
      }
    }
  }, [loading]);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const resEvent = await getEventController(eventId);

        if (resEvent.status === 404) {
          navigate("/404", { state: { ErrorId: 2, redirect: "/events" } });
          return;
        }
        setEvent(resEvent);
        setIsJoin(resEvent.UserInEvent);
      } catch (error) {
        console.log("Error fetching event:", error);
      }
    };

    fetchEvent();
  }, [eventId, getEventController]);

  const JoinEvent = async (id) => {
    let data = {
      EventID: id,
    };

    let res = await joinEventController(data);
    if (res.status === 200) {
      setIsJoin(true);
    }
  };

  const LeaveEvent = async (id) => {
    let data = {
      EventID: id,
    };
    let res = await leaveEventController(data);
    if (res.status === 200) {
      setIsJoin(false);
    }
  };

  return (
    <Box>
      <Navbar where={"Event"} />
      <Box
        className="EventHeader"
        px={4}
        py={6}
        sx={{ backgroundColor: "#1c172e" }}
      >
        <Typography variant="h3" fontWeight={"bold"}>
          {event.name}
        </Typography>
        <Typography variant="caption">
          Hosted by{" "}
          <Link style={{ color: "#f5b400" }}> {event.business_name}</Link>
        </Typography>
      </Box>
      <Box display={"flex"} justifyContent={"space-between"} p={4}>
        <Box width={"100%"}>
          <Typography variant="h5">Details</Typography>
          <Typography variant="body1">{event.description}</Typography>
        </Box>
        <Box width={"30%"} backgroundColor={"#1c172e"} p={4} borderRadius={2}>
          <Box display="flex" alignItems="center">
            <LocationOnIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" color={"#f5b400"}>
              {event.location}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <AccessAlarmsIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" color={"#f5b400"}>
              {event.time}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" mt={2}>
            <CalendarMonthIcon sx={{ marginRight: 1 }} />
            <Typography variant="body2" color={"#f5b400"}>
              {event.date}
            </Typography>
          </Box>
          <Box className="btn" mt={3}>
            {isJoin ? (
              <Button
                color="error"
                fullWidth
                variant="contained"
                onClick={() => {
                  LeaveEvent(eventId);
                }}
                startIcon={<EventBusyIcon />}
              >
                Leave Event
              </Button>
            ) : (
              <Button
                onClick={() => {
                  JoinEvent(eventId);
                }}
                fullWidth
                variant="contained"
                startIcon={<EventAvailableIcon />}
              >
                Join Event
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Event;
