import axios from "../axios";

export const LoginBusinessRequest = (data) =>
  axios.post("/login/business", data);

export const CreateBusinessRequest = (data) =>
  axios.post("/create/business", data);
