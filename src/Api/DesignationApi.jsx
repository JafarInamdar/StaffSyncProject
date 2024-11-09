import axios from "axios";
import { getAuthHeader } from "./AdminApi";

const BASE_URL = "http://localhost:8084/api/designations"; // Note the corrected URL

export const getAllDesignations = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching designations:", error);
    throw error;
  }
};

export const addDesignation = async (designationData) => {
  try {
    const response = await axios.post(BASE_URL, designationData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding designation:", error);
    throw error;
  }
};

export const updateDesignation = async (id, designationData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, designationData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating designation with ID ${id}:`, error);
    throw error;
  }
};

export const getDesignationById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching designation with ID ${id}:`, error);
    throw error;
  }
};

export const deleteDesignationById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting designation with ID ${id}:`, error);
    throw error;
  }
};
