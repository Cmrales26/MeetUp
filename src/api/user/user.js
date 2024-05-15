import axios from "../axios";

export const LoginRequest = (data) => axios.post("/login/user", data);

export const getEvents = (token) =>
  axios.get("/get/events", { headers: { Authorization: `Bearer ${token}` } });

export const getMyEvents = (token) =>
  axios.get("/get/MyEvent", { headers: { Authorization: `Bearer ${token}` } });

export const getEvent = (token, id) =>
  axios.get(`/get/event/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const JoinEvent = (EventId, token) =>
  axios.post("/join/event", EventId, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const LeaveEvent = (EventId, token) =>
  axios.post("/leave/event", EventId, {
    headers: { Authorization: `Bearer ${token}` },
  });
