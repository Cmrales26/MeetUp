import { createContext, useContext, useState } from "react";
import {
  CreateEventRequest,
  DeleteEventRequest,
  ReactivateEventRequest,
  getEventsRequest,
  updateEventRequest,
} from "../api/Business/business";
import Cookies from "universal-cookie";

export const BusinessEventContext = createContext();

export const useBusinessEvent = () => {
  const context = useContext(BusinessEventContext);
  if (!context) {
    throw new Error(
      "useBusinessEvent must be used within a BusinessEventProvider"
    );
  }
  return context;
};

const cookies = new Cookies();

export const BusinessEventProvider = ({ children }) => {
  const [events, SetEvent] = useState([]);
  const [editEvent, setEditEvent] = useState([]);

  const getEventController = async () => {
    let token = cookies.get("token");
    try {
      const res = await getEventsRequest(token);
      if (res.status === 200) {
        SetEvent(res.data);
      }
    } catch (error) {
      return error.response;
    }
  };

  const CreateEventController = async (data) => {
    let token = cookies.get("token");
    try {
      const res = await CreateEventRequest(token, data);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  const EditEventController = async (id, data) => {
    let token = cookies.get("token");
    try {
      const res = await updateEventRequest(id, data, token);
      return res;
    } catch (error) {
      return error.response;
    }
  };

  const deleteEventController = async (id) => {
    let token = cookies.get("token");
    try {
      const res = await DeleteEventRequest(id, token);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };
  const reactivateEventController = async (id) => {
    let token = cookies.get("token");
    try {
      const res = await ReactivateEventRequest(id, token);
      console.log(res);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <BusinessEventContext.Provider
      value={{
        events,
        editEvent,
        getEventController,
        CreateEventController,
        setEditEvent,
        EditEventController,
        deleteEventController,
        reactivateEventController,
      }}
    >
      {children}
    </BusinessEventContext.Provider>
  );
};
