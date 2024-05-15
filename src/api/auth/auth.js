import axios from "../axios";

export const CheckLogin = (token) => axios.post("/checkLogin", token);

export const LogOut = () => axios.get("/logout");
