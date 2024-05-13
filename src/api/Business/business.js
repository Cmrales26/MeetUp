import axios from "../axios";

export const LoginBusinessRequest = (data) =>
  axios.post("/login/business", data);
