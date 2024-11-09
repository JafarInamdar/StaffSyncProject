import axios from "axios";
import { getAuthHeader } from "./AdminApi"; // Assuming you have AdminApi.js to handle authentication

const BASE_URL = "http://localhost:8084/api/employees";

// Fetch all employees
export const getAllEmployees = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to load employees:", error);
    throw error;
  }
};

// Add a new employee
export const addEmployee = async (employeeData) => {
  try {
    const response = await axios.post(BASE_URL, employeeData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Failed to add employee:", error);
    throw error;
  }
};

// Update an existing employee by ID
export const updateEmployee = async (id, employeeData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, employeeData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to update employee with ID ${id}:`, error);
    throw error;
  }
};

// Get an employee by ID
export const getEmployeeById = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to load employee with ID ${id}:`, error);
    throw error;
  }
};

// Delete an employee by ID
export const deleteEmployeeById = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(`Failed to delete employee with ID ${id}:`, error);
    throw error;
  }
};

// Get employees by department ID
export const getEmployeesByDepartment = async (departmentId) => {
  try {
    const response = await axios.get(`${BASE_URL}/department/${departmentId}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error(
      `Failed to load employees by department ID ${departmentId}:`,
      error
    );
    throw error;
  }
};

// Get employees by designation ID
export const getEmployeesByDesignation = async (designationId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/designation/${designationId}`,
      {
        headers: getAuthHeader(),
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      `Failed to load employees by designation ID ${designationId}:`,
      error
    );
    throw error;
  }
};
