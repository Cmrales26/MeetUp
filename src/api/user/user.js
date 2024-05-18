import axios from "../axios";

export const LoginRequest = (data) => axios.post("/login/user", data);

export const CreateRequest = (data) => axios.post("/CreateAccount/user", data);

export const UpdateRequest = (data, UserId) =>
  axios.patch(`/edit/user/${UserId}`, data);

export const ChangePasswordRequest = (data) =>
  axios.post(`/change/user/pass`, data);

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
