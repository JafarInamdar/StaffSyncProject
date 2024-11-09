import React, { useState } from "react";
import { loginAdmin } from "../Api/AdminApi";
import { Link } from "react-router-dom";
// import styles from "./LoginPage.module.css"; // Import the CSS Module
import styles from "../style/LoginPage.module.css";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await loginAdmin({ username, password });
      window.location.href = "/department";
    } catch (error) {
      setError("Login Failed. Please check your Username & password");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2 className={styles.textCenter}>Admin Login</h2>
      <form onSubmit={handleSubmit} className={styles.loginForm}>
        <div className={styles.formGroup}>
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

        <div className={styles.formGroup}>
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

        {error && <p className={styles.textDanger}>{error}</p>}

        <button type="submit" className={`btn btn-primary ${styles.btn}`}>
          Login
        </button>
        <div className={`${styles.mt3} ${styles.textCenter}`}>
          <Link to="/register" className={`btn btn-secondary ${styles.btn}`}>
            Go to Registration
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
