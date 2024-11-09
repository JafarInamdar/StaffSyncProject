import React, { useEffect, useState } from "react";
import {
  addDesignation,
  deleteDesignationById,
  getAllDesignations,
  updateDesignation,
} from "../Api/DesignationApi";

const Designations = () => {
  const [designations, setDesignations] = useState([]);
  const [designationId, setDesignationId] = useState(null);
  const [designationTitle, setDesignationTitle] = useState("");
  const [designationDescription, setDesignationDescription] = useState("");
  const [designationLevel, setDesignationLevel] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchDesignations();
  }, []);
  const fetchDesignations = async () => {
    try {
      const data = await getAllDesignations();
      setDesignations(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const designationData = {
        designationTitle,
        designationDescription,
        designationLevel,
      };

      if (designationId) {
        await updateDesignation(designationId, designationData);
      } else {
        await addDesignation(designationData);
      }
      fetchDesignations();
      clearForm();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data);
      } else {
        console.error("Error saving designation:", error);
      }
    }
  };

  const handleEdit = (designation) => {
    setDesignationId(designation.designationId);
    setDesignationTitle(designation.designationTitle);
    setDesignationLevel(designation.designationLevel);
    setDesignationDescription(designation.designationDescription);
  };

  const handleDelete = async (id) => {
    try {
      await deleteDesignationById(id);
      fetchDesignations();
    } catch (error) {
      console.error("Error deleting designation:", error);
    }
  };

  const clearForm = () => {
    setDesignationId(null);
    setDesignationTitle("");
    setDesignationDescription("");
    setDesignationLevel("");
    setErrors({});
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Designations</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="designationTitle" className="form-label">
            Designation Title
          </label>
          <input
            type="text"
            className="form-control"
            id="designationTitle"
            value={designationTitle}
            onChange={(e) => setDesignationTitle(e.target.value)}
            required
          />

          {errors.designationTitle && (
            <div className="text-danger">{errors.designationTitle}</div>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="designationLevel" className="form-label">
            Designation Level
          </label>
          <input
            type="text"
            className="form-control"
            id="designationLevel"
            value={designationLevel}
            onChange={(e) => setDesignationLevel(e.target.value)}
            required
          />
          {errors.designationLevel && (
            <div className="text-danger">{errors.designationLevel} </div>
          )}
        </div>

        <div className="mb-4">
          <label className="form-label" htmlFor="designationDescription">
            Designation Description
          </label>
          <input
            type="text"
            id="designationDescription"
            className="form-control"
            onChange={(e) => setDesignationDescription(e.target.value)}
            value={designationDescription}
            required
          />
          {errors.designationDescription && (
            <div className="text-danger">{errors.designationDescription} </div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          {designationId ? "Update Designation" : "Add Designation"}
        </button>
      </form>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Designation Title</th>
            <th>Designation Level</th>
            <th>Designation Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {designations.map((designation) => (
            <tr key={designation.designationId}>
              <td>{designation.designationTitle}</td>
              <td>{designation.designationLevel}</td>
              <td>{designation.designationDescription}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(designation)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(designation.designationId)}
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

export default Designations;
