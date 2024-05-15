import { createContext, useContext, useState } from "react";
import { JoinEvent, LeaveEvent, getEvent, getEvents } from "../api/user/user";
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

  const getEventsController = async () => {
    let token = cookies.get("token");
    try {
      const res = await getEvents(token);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getEventController = async (id) => {
    let token = cookies.get("token");
    try {
      const res = await getEvent(token, id);
      return res.data[0];
    } catch (error) {
      console.log(error);
    }
  };

  const joinEventController = async (eventId) => {
    let token = cookies.get("token");
    try {
      const res = await JoinEvent(eventId, token);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  const leaveEventController = async (eventId) => {
    let token = cookies.get("token");
    try {
      const res = await LeaveEvent(eventId, token);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <UserEventContext.Provider
      value={{
        events,
        getEventsController,
        getEventController,
        joinEventController,
        leaveEventController,
      }}
    >
      {" "}
      {children}
    </UserEventContext.Provider>
  );
};
