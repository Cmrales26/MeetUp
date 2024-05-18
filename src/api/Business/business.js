import axios from "../axios";

export const LoginBusinessRequest = (data) =>
  axios.post("/login/business", data);

export const CreateBusinessRequest = (data) =>
  axios.post("/create/business", data);

export const getEventsRequest = (token) =>
  axios.get("/Business/my/events", {
    headers: { Authorization: `Bearer ${token}` },
  });

export const CreateEventRequest = (token, data) =>
  axios.post("/create/event", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
