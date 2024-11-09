// import React, { useState, useEffect } from "react";
// import {
//   getAllDepartments,
//   addDepartment,
//   updateDepartment,
//   deleteDepartment,
// } from "../Api/DepartmentApi";

// const Departments = () => {
//   const [departments, setDepartments] = useState([]);
//   const [departmentId, setDepartmentId] = useState(null);
//   const [departmentName, setDepartmentName] = useState("");
//   const [departmentDescription, setDepartmentDescription] = useState("");

//   useEffect(() => {
//     fetchDepartments();
//   }, []);

//   const fetchDepartments = async () => {
//     try {
//       const data = await getAllDepartments();
//       console.log("**************");
//       console.log(data);
//       setDepartments(data);
//     } catch (error) {
//       console.error("Error fetching departments:", error);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const departmentData = {
//         departmentName,
//         departmentDescription,
//       };

//       if (departmentId) {
//         // Update department
//         await updateDepartment(departmentId, departmentData);
//       } else {
//         // Add new department
//         await addDepartment(departmentData);
//       }

//       setDepartmentName("");
//       setDepartmentDescription("");
//       setDepartmentId(null);

//       fetchDepartments(); // Refresh the list
//     } catch (error) {
//       console.error("Error saving department:", error);
//     }
//   };

//   const handleEdit = (department) => {
//     setDepartmentId(department.departmentId);
//     setDepartmentName(department.departmentName);
//     setDepartmentDescription(department.departmentDescription);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await deleteDepartment(id);
//       fetchDepartments(); // Refresh the list
//     } catch (error) {
//       console.error("Error deleting department:", error);
//     }
//   };

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Departments</h2>

//       <form onSubmit={handleSubmit} className="mb-4">
//         <div className="mb-3">
//           <label htmlFor="departmentName" className="form-label">
//             Department Name
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="departmentName"
//             value={departmentName}
//             onChange={(e) => setDepartmentName(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="departmentDescription" className="form-label">
//             Department Description
//           </label>
//           <input
//             type="text"
//             className="form-control"
//             id="departmentDescription"
//             value={departmentDescription}
//             onChange={(e) => setDepartmentDescription(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {departmentId ? "Update Department" : "Add Department"}
//         </button>
//       </form>

//       <table className="table table-bordered table-striped">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Description</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {departments.map((department) => (
//             <tr key={department.departmentId}>
//               <td>{department.departmentId}</td>
//               <td>{department.departmentName}</td>
//               <td>{department.departmentDescription}</td>
//               <td>
//                 <button
//                   className="btn btn-warning me-2"
//                   onClick={() => handleEdit(department)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-danger"
//                   onClick={() => handleDelete(department.departmentId)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Departments;

import React, { useState, useEffect } from "react";
import {
  getAllDepartments,
  addDepartment,
  updateDepartment,
  deleteDepartment,
} from "../Api/DepartmentApi";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [departmentId, setDepartmentId] = useState(null);
  const [departmentName, setDepartmentName] = useState("");
  const [departmentDescription, setDepartmentDescription] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const departmentData = {
        departmentName,
        departmentDescription,
      };

      if (departmentId) {
        await updateDepartment(departmentId, departmentData);
      } else {
        await addDepartment(departmentData);
      }

      // Clear form and errors after successful save
      setDepartmentName("");
      setDepartmentDescription("");
      setDepartmentId(null);
      setErrors({});

      fetchDepartments(); // Refresh the list
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Validation errors
        setErrors(error.response.data);
      } else {
        console.error("Error saving department:", error);
      }
    }
  };

  const handleEdit = (department) => {
    setDepartmentId(department.departmentId);
    setDepartmentName(department.departmentName);
    setDepartmentDescription(department.departmentDescription);
    setErrors({});
  };

  const handleDelete = async (id) => {
    try {
      await deleteDepartment(id);
      fetchDepartments(); // Refresh the list
    } catch (error) {
      console.error("Error deleting department:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 classNa
      me="mb-4">Departments</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="departmentName" className="form-label">
            Department Name
          </label>
          <input
            type="text"
            className="form-control"
            id="departmentName"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
          {errors.departmentName && (
            <div className="text-danger">{errors.departmentName}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="departmentDescription" className="form-label">
            Department Description
          </label>
          <input
            type="text"
            className="form-control"
            id="departmentDescription"
            value={departmentDescription}
            onChange={(e) => setDepartmentDescription(e.target.value)}
            required
          />
          {errors.departmentDescription && (
            <div className="text-danger">{errors.departmentDescription}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {departmentId ? "Update Department" : "Add Department"}
        </button>
      </form>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(department)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(department.departmentId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Departments;
