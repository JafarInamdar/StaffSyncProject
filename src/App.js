import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import LoginPage from "./Admin/LoginPage";
import RegistrationPage from "./Admin/RegistrationPage"; // Import RegistrationPage
import Dashbord from "./Dashbord";
import Departments from "./component/Departments";
import Designations from "./component/Designations";
import Employee from "./component/Employees";
import NavbarComponent from "./component/NavbarComponent";
import DepartmentsList from "./component/DepartmentsList";

const App = () => {
  const location = useLocation();
  const shouldShowNavbar =
    location.pathname !== "/" &&
    location.pathname !== "/login" &&
    location.pathname !== "/register";

  return (
    <>
      {shouldShowNavbar && <NavbarComponent />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />{" "}
        {/* Add RegistrationPage route */}
        <Route path="/dashboard" element={<Dashbord />} />
        <Route path="/department" element={<Departments />} />
        <Route path="/designation" element={<Designations />} />
        <Route path="/employee" element={<Employee />} />
        <Route path="/departmentsPagination" element={<DepartmentsList />} />
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
