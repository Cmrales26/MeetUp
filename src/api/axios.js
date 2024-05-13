import axios from "axios";

const baseURL = "http://127.0.0.1:456/api";

const instance = axios.create({
  baseURL,
  withCredentials: false,
});

export default instance;
