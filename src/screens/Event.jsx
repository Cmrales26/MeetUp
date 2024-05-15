import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useUserEvents } from "../context/UserEventContext";
import { Box, Button, Typography } from "@mui/material";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LocationOnIcon from "@mui/icons-material/LocationOn";
const Event = () => {
  let { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [isJoin, setIsJoin] = useState(false);

  const { getEventController, joinEventController, leaveEventController } =
    useUserEvents();
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const resEvent = await getEventController(eventId);
        setEvent(resEvent);
        setIsJoin(resEvent.UserInEvent);
        // TODO: do a better alert when event in url don't exist
      } catch (error) {
        console.error("Error fetching event:", error);
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
      <Box className="EventHeader" p={4} sx={{ backgroundColor: "#1c172e" }}>
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
