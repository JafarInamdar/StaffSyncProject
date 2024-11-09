import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./NavbarComponent.css";
import { logoutAdmin } from "../Api/AdminApi";

const NavbarComponent = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutAdmin(); // Remove token from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink
            to="/department"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Department
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/departmentsPagination"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Department List
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/designation"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Designation
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/employee"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Employee
          </NavLink>
        </li>
      </ul>
      <div className="logout-container">
        <NavLink to="/login" className="logout-button" onClick={handleLogout}>
          Logout
        </NavLink>
      </div>
    </nav>
  );
};

export default NavbarComponent;
