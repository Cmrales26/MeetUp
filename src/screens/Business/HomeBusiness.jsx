import { Box, Button, Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import BusinessBanner from "../../components/Business/BusinessBanner";
import { useUserAuth } from "../../context/AuthContex";
import { useNavigate } from "react-router-dom";
import { useBusinessEvent } from "../../context/BusinessEventContex";
import EventForm from "../../components/Business/EventForm";
import EventsTable from "../../components/Business/EventTable";

const HomeBusiness = () => {
  const { user, isAuth, loading } = useUserAuth();
  const {
    getEventController,
    CreateEventController,
    EditEventController,
    setEditEvent,
    events,
    editEvent,
    deleteEventController,
    reactivateEventController,
  } = useBusinessEvent();

  const [IsEditing, setIsEditing] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (!isAuth) {
        navigate("/login");
      }
      if (user.rol === undefined && user.rol !== "business") {
        navigate("/home");
      }
    }
  }, [user, isAuth, loading]);

  useEffect(() => {
    getEventController();
  }, []);

  if (loading) {
    return <Box>Loading...</Box>;
  }

  return (
    <Box>
      <BusinessBanner business={user} />

      <Box p={4}>
        <Grid container spacing={3}>
          <Grid
            item
            xs={12}
            sm={4}
            sx={{ backgroundColor: "#1c172e", borderRadius: "10px" }}
          >
            <Box pr={3} pt={3} pb={3}>
              {IsEditing ? (
                <Box display={"flex"} justifyContent={"space-between"}>
                  <h2>{"Edit Form"}</h2>
                  <Button
                    onClick={() => {
                      setIsEditing(false);
                      setEditEvent(null);
                    }}
                  >
                    Click to Create
                  </Button>
                </Box>
              ) : (
                <h2>{"Create Form"}</h2>
              )}
              <Box mt={2}>
                <EventForm
                  IsEditing={IsEditing}
                  CreateEventController={CreateEventController}
                  EditEventController={EditEventController}
                  editEvent={editEvent}
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={8}>
            <EventsTable
              events={events}
              setEditEvent={setEditEvent}
              setIsEditing={setIsEditing}
              deleteEventController={deleteEventController}
              reactivateEventController={reactivateEventController}
            ></EventsTable>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HomeBusiness;
