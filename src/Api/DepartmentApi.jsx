import axios from "axios";
import { getAuthHeader } from "./AdminApi";

const BASE_URL = "http://localhost:8084/api/departments";

export const getAllDepartments = async () => {
  try {
    const response = await axios.get(BASE_URL, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching departments:", error);
    throw error;
  }
};

// export const getAllDepartmentsPaginated = async (
//   page,
//   size,
//   sort = "departmentName,asc"
// ) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/paginated`, {
//       headers: {
//         page,
//         size,
//         sort,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching paginated departments:", error);
//     throw error;
//   }
// };

export const getAllDepartmentsPaginated = async (
  page,
  size,
  sort = "departmentName,asc"
) => {
  try {
    const response = await axios.get(`${BASE_URL}/paginated`, {
      headers: {
        ...getAuthHeader(),
      },
      params: { page, size, sort },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching paginated departments:", error);
    throw error;
  }
};

export const addDepartment = async (departmentData) => {
  try {
    const response = await axios.post(BASE_URL, departmentData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error adding department:", error);
    throw error;
  }
};

export const updateDepartment = async (id, departmentData) => {
  try {
    const response = await axios.put(`${BASE_URL}/${id}`, departmentData, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error updating department:", error);
    throw error;
  }
};

export const deleteDepartment = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${id}`, {
      headers: getAuthHeader(),
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting department:", error);
    throw error;
  }
};

export const getDepartmentById = async (id) => {
  try {
    await axios.get(`${BASE_URL}/${id}`, {
      headers: getAuthHeader,
    });
  } catch (error) {
    console.error(`Error Failed to Load Department By Id ${id}`, error);
    throw error;
  }
};

export const serchDepartments = async (searchTerm) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      headers: getAuthHeader(),
      params: { q: searchTerm },
    });
    return response.data;
  } catch (error) {
    console.error("Error searching departments:", error);
    throw error;
  }
};
