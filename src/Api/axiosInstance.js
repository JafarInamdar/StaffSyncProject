import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8084",
});

// Set the Authorization header globally if the token exists
const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axiosInstance;
