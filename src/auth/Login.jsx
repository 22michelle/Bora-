import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        values
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      setErrorMessage(error.response?.data.message || "An error occurred.");
      console.error("Error logging in:", error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setErrorMessage("");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login to Bora!!</h1>
        <form onSubmit={handleSubmit} noValidate>
          {/* Input email */}
          <div className="mb-3">
            {errorMessage && (
              <div className="alert alert-danger alert-dismissible">
                {errorMessage}
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleCloseError}
                >
                  &times;
                </button>
              </div>
            )}
            <label htmlFor="email" className="form-label">
              <FontAwesomeIcon icon={faEnvelope} /> Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              required
              autoComplete="username"
            />
            <div className="invalid-feedback">Please enter your email.</div>
          </div>
          {/* Input password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <FontAwesomeIcon icon={faLock} /> Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="********"
              required
              autoComplete="current-password"
            />
            <div className="invalid-feedback">Please enter your password.</div>
          </div>
          {/* Button submit */}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
          {/* Text */}
          <div className="mt-3 text-center">
            <p className="fw-bold">
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </div>
        </form>
      </div>

      {/* Spinner */}
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
