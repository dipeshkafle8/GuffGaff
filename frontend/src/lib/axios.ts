import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8001/api",
  withCredentials: true, //if want to include cookies in a requests
});

export default axiosInstance;
