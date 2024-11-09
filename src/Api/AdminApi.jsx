import axios from "axios";

const BASE_URL = "http://localhost:8084";

export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, adminData);
    return response.data;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw error;
  }
};

export const loginAdmin = async (adminData) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, adminData);
    const token = response.data;
    // token stored in local storage
    localStorage.setItem("token", token);
    return token;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

export const logoutAdmin = () => {
  localStorage.removeItem("token");
};

export const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  console.log("*****************************");
  console.log(token);
  console.log("*****************************");

  return token ? { Authorization: `Bearer ${token}` } : {};
  // return token ? { Authorization: `${token}` } : {};
};

// import axiosInstance from "./axiosInstance";

// export const registerAdmin = async (adminData) => {
//   try {
//     const response = await axiosInstance.post("/register", adminData);
//     return response.data;
//   } catch (error) {
//     console.error("Error registering admin:", error);
//     throw error;
//   }
// };

// export const loginAdmin = async (adminData) => {
//   try {
//     const response = await axiosInstance.post("/login", adminData);
//     const token = response.data;
//     // Store the token in local storage
//     localStorage.setItem("token", token);

//     // Update the axios instance header with the new token
//     axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

//     return token;
//   } catch (error) {
//     console.error("Error logging in admin:", error);
//     throw error;
//   }
// };

// export const logoutAdmin = () => {
//   localStorage.removeItem("token");
//   delete axiosInstance.defaults.headers.common["Authorization"];
// };
