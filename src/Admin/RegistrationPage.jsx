import React, { useState } from "react";
import { registerAdmin } from "../Api/AdminApi";
import { Link } from "react-router-dom";
import "../style/RegistrationPage.module.css"; // Import CSS module for additional styles

const RegistrationPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await registerAdmin({ username, password });
      setSuccess("Registration successful! Please log in.");
      setUsername("");
      setPassword("");
    } catch (error) {
      setError("Registration Failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="text-center">Admin Registration</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username:</label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password:</label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                {error && <p className="text-danger">{error}</p>}
                {success && <p className="text-success">{success}</p>}

                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-2"
                >
                  Register
                </button>
              </form>
              <div className="mt-3 text-center">
                <Link to="/login" className="btn btn-secondary">
                  Go to Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
