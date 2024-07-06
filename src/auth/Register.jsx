import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formErrors, setFormErrors] = useState({
    passwordError: "",
    confirmPasswordError: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password" || name === "confirmPassword") {
      validatePassword(name, value);
    }
  };

  const validatePassword = (name, value) => {
    if (name === "password") {
      if (value.length < 8) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passwordError: "Password must be at least 8 characters long",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          passwordError: "",
        }));
      }
    } else if (name === "confirmPassword") {
      if (value !== formData.password) {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPasswordError: "Passwords do not match",
        }));
      } else {
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          confirmPasswordError: "",
        }));
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormErrors({
        ...formErrors,
        confirmPasswordError: "Passwords do not match",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        formData
      );
      setErrorMessage("");
      console.log("Registration successful:", response.data);
      window.location.href = "/login";
    } catch (error) {
      setErrorMessage("An error occurred");
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
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
        <h1>Welcome To Bora!!</h1>
        <form onSubmit={handleSubmit}>
          {/* Name input */}
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
            <label htmlFor="name" className="form-label">
              <FontAwesomeIcon icon={faUser} /> Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              autoComplete="username"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          {/* Email input */}
          <div className="mb-3">
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
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* Password input */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <FontAwesomeIcon icon={faLock} /> Password
            </label>
            <input
              type="password"
              className={`form-control ${
                formErrors.passwordError ? "is-invalid" : ""
              }`}
              id="password"
              name="password"
              placeholder="********"
              required
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
            />
            {formErrors.passwordError && (
              <div className="invalid-feedback">
                {formErrors.passwordError}
              </div>
            )}
          </div>
          {/* Confirm Password input */}
          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">
              <FontAwesomeIcon icon={faLock} /> Confirm Password
            </label>
            <input
              type="password"
              className={`form-control ${
                formErrors.confirmPasswordError ? "is-invalid" : ""
              }`}
              id="confirm-password"
              name="confirmPassword"
              placeholder="********"
              required
              autoComplete="new-password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            {formErrors.confirmPasswordError && (
              <div className="invalid-feedback">
                {formErrors.confirmPasswordError}
              </div>
            )}
          </div>
          {/* Submit button */}
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
          {/* Already have an account */}
          <div className="mt-3 text-center">
            <p className="fw-bold">
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </form>
      </div>
      {/* Loading spinner */}
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

export default Register;
