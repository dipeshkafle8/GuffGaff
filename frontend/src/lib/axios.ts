import axios from "axios";

export const axiosWithCookie = axios.create({
  baseURL: "https://guffgaff-pwda.onrender.com/api",
  withCredentials: true, //if want to include cookies in a requests
});

export const axiosInstance = axios.create({
  baseURL: "https://guffgaff-pwda.onrender.com/api",
});
