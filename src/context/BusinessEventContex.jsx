import { createContext, useContext, useState } from "react";
import { CreateEventRequest, getEventsRequest } from "../api/Business/business";
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

  const getEventController = async () => {
    let token = cookies.get("token");
    try {
      const res = await getEventsRequest(token);
      if (res.status === 200) {
        SetEvent(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const CreateEventController = async (data) => {
    let token = cookies.get("token");
    console.log(token);
    try {
      const res = await CreateEventRequest(token, data);
      return res;
    } catch (error) {
      return error.response;
    }
  };
  return (
    <BusinessEventContext.Provider
      value={{ events, getEventController, CreateEventController }}
    >
      {children}
    </BusinessEventContext.Provider>
  );
};
