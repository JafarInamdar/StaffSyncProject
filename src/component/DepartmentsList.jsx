import React, { useEffect, useState } from "react";
import { getAllDepartmentsPaginated } from "../Api/DepartmentApi";

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const pageSizes = [1, 2, 5, 10, 50, 100];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await getAllDepartmentsPaginated(page, size);
        setDepartments(data.content);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("Error fetching paginated departments:", error);
      }
    };

    fetchDepartments();
  }, [page, size]);

  useEffect(() => {
    const results = departments.filter((department) =>
      department.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredDepartments(results);
  }, [searchTerm, departments]);

  const handlePrevious = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handleSizeChange = (e) => {
    setSize(Number(e.target.value));
    setPage(0);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="container mt-4">
      <h1>Department List</h1>

      <div className="mb-3">
        {/* <div className="row">
          <div className="col-sm-9 mt-3"></div>
          <div className="col-sm-3 mt-1">
            <input
              type="text"
              placeholder="Search by department name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>
        </div> */}

        <div className="row">
          <div className="col-sm-3">
            <label htmlFor="pageSizeSelect" className="form-label">
              Page Size:
            </label>
            <select
              id="pageSizeSelect"
              className="form-select"
              value={size}
              onChange={handleSizeChange}
            >
              {pageSizes.map((sizeOption) => (
                <option key={sizeOption} value={sizeOption}>
                  {sizeOption}
                </option>
              ))}
            </select>
          </div>
          <div className="col-sm-6 mt-3"></div>
          <div className="col-sm-3 mt-3">
            <input
              type="text"
              placeholder="Search by department name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredDepartments.map((department) => (
            <tr key={department.departmentId}>
              <td>{department.departmentId}</td>
              <td>{department.departmentName}</td>
              <td>{department.departmentDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <button
          className="btn btn-secondary"
          onClick={handlePrevious}
          disabled={page === 0}
        >
          Previous
        </button>
        <span>
          Page {page + 1} of {totalPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={handleNext}
          disabled={page >= totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DepartmentsList;
