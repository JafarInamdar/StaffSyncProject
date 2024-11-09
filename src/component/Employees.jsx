import React, { useState, useEffect } from "react";
import {
  getAllEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployeeById,
  // getAllDepartments,
  // getAllDesignations,
} from "../Api/EmployeeApi"; // Adjust the import path if necessary
import { getAllDepartments } from "../Api/DepartmentApi";
import { getAllDesignations } from "../Api/DesignationApi";

const Employee = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeId, setEmployeeId] = useState(null);
  const [employeeFirstName, setEmployeeFirstName] = useState("");
  const [employeeLastName, setEmployeeLastName] = useState("");
  const [employeePhoneNumber, setEmployeePhoneNumber] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeDateOfJoining, setEmployeeDateOfJoining] = useState("");
  const [employeeSalary, setEmployeeSalary] = useState("");
  const [employeeAddress, setEmployeeAddress] = useState("");
  const [departments, setDepartments] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("");

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
    fetchDesignations();
  }, []);

  const fetchEmployees = async () => {
    try {
      const data = await getAllEmployees();
      setEmployees(data);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const data = await getAllDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Failed to fetch departments:", error);
    }
  };

  const fetchDesignations = async () => {
    try {
      const data = await getAllDesignations();
      setDesignations(data);
    } catch (error) {
      console.error("Failed to fetch designations:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employeeData = {
        employeeFirstName,
        employeeLastName,
        employeePhoneNumber,
        employeeEmail,
        employeeDateOfJoining,
        employeeSalary,
        employeeAddress,
        department: { departmentId: selectedDepartment },
        designation: { designationId: selectedDesignation },
      };

      if (employeeId) {
        await updateEmployee(employeeId, employeeData);
      } else {
        await addEmployee(employeeData);
      }

      fetchEmployees();
      clearForm();
    } catch (error) {
      console.error("Error saving employee:", error);
    }
  };

  const handleEdit = (employee) => {
    setEmployeeId(employee.employeeId);
    setEmployeeFirstName(employee.employeeFirstName);
    setEmployeeLastName(employee.employeeLastName);
    setEmployeePhoneNumber(employee.employeePhoneNumber);
    setEmployeeEmail(employee.employeeEmail);
    setEmployeeDateOfJoining(employee.employeeDateOfJoining);
    setEmployeeSalary(employee.employeeSalary);
    setEmployeeAddress(employee.employeeAddress);
    setSelectedDepartment(employee.department?.departmentId || "");
    setSelectedDesignation(employee.designation?.designationId || "");
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployeeById(id);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const clearForm = () => {
    setEmployeeId(null);
    setEmployeeFirstName("");
    setEmployeeLastName("");
    setEmployeePhoneNumber("");
    setEmployeeEmail("");
    setEmployeeDateOfJoining("");
    setEmployeeSalary("");
    setEmployeeAddress("");
    setSelectedDepartment("");
    setSelectedDesignation("");
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employees</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="employeeFirstName" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="employeeFirstName"
            value={employeeFirstName}
            onChange={(e) => setEmployeeFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employeeLastName" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="employeeLastName"
            value={employeeLastName}
            onChange={(e) => setEmployeeLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employeePhoneNumber" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            className="form-control"
            id="employeePhoneNumber"
            value={employeePhoneNumber}
            onChange={(e) => setEmployeePhoneNumber(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employeeEmail" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="employeeEmail"
            value={employeeEmail}
            onChange={(e) => setEmployeeEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employeeDateOfJoining" className="form-label">
            Date of Joining
          </label>
          <input
            type="date"
            className="form-control"
            id="employeeDateOfJoining"
            value={employeeDateOfJoining}
            onChange={(e) => setEmployeeDateOfJoining(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employeeSalary" className="form-label">
            Salary
          </label>
          <input
            type="number"
            className="form-control"
            id="employeeSalary"
            value={employeeSalary}
            onChange={(e) => setEmployeeSalary(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="employeeAddress" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            id="employeeAddress"
            value={employeeAddress}
            onChange={(e) => setEmployeeAddress(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="departmentSelect" className="form-label">
            Department
          </label>
          <select
            id="departmentSelect"
            className="form-select"
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option
                key={department.departmentId}
                value={department.departmentId}
              >
                {department.departmentName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="designationSelect" className="form-label">
            Designation
          </label>
          <select
            id="designationSelect"
            className="form-select"
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            required
          >
            <option value="">Select Designation</option>
            {designations.map((designation) => (
              <option
                key={designation.designationId}
                value={designation.designationId}
              >
                {designation.designationTitle}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          {employeeId ? "Update Employee" : "Add Employee"}
        </button>
      </form>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Email</th>
            <th>Date of Joining</th>
            <th>Salary</th>
            <th>Address</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.employeeId}>
              <td>{employee.employeeFirstName}</td>
              <td>{employee.employeeLastName}</td>
              <td>{employee.employeePhoneNumber}</td>
              <td>{employee.employeeEmail}</td>
              <td>{employee.employeeDateOfJoining}</td>
              <td>{employee.employeeSalary}</td>
              <td>{employee.employeeAddress}</td>
              <td>{employee.department?.departmentName}</td>
              <td>{employee.designation?.designationTitle}</td>
              {/* <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(employee)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(employee.employeeId)}
                >
                  Delete
                </button>
              </td> */}

              <td>
                <div className="d-flex">
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(employee.employeeId)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Employee;
