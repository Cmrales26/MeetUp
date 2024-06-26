import { createContext, useContext, useState } from "react";
import {
  JoinEvent,
  LeaveEvent,
  getEvent,
  getEvents,
  getMyEvents,
} from "../api/user/user";
import Cookies from "universal-cookie";

export const UserEventContext = createContext();

export const useUserEvents = () => {
  const context = useContext(UserEventContext);
  if (!context) {
    throw new Error("useUserAuth must be used within a UserAuthProvider");
  }
  return context;
};

const cookies = new Cookies();

export const UserEventsProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [myEvents, setMyEvents] = useState([]);
  const getEventsController = async () => {
    let token = cookies.get("token");
    try {
      const res = await getEvents(token);
      setEvents(res.data);
    } catch (error) {
      return error.response;
    }
  };

  const getMyEventsController = async () => {
    let token = cookies.get("token");
    try {
      const res = await getMyEvents(token);
      setMyEvents(res.data);
    } catch (error) {
      return error.response;
    }
  };

  const getEventController = async (id) => {
    let token = cookies.get("token");
    try {
      const res = await getEvent(token, id);
      return res.data[0];
    } catch (error) {
      return error.response;
    }
  };

  const joinEventController = async (eventId) => {
    let token = cookies.get("token");
    try {
      const res = await JoinEvent(eventId, token);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  const leaveEventController = async (eventId) => {
    let token = cookies.get("token");
    try {
      const res = await LeaveEvent(eventId, token);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  return (
    <UserEventContext.Provider
      value={{
        events,
        myEvents,
        getEventsController,
        getEventController,
        joinEventController,
        leaveEventController,
        getMyEventsController,
      }}
    >
      {children}
    </UserEventContext.Provider>
  );
};
