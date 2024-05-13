import axios from "../axios";

export const LoginRequest = (data) => axios.post("/login/user", data);
