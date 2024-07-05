import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Register = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

<<<<<<< HEAD
    setLoading(true); // spinner

    // Validar que las contraseñas coincidan en el frontend
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match!");
=======
    setLoading(true); // Activate spinner

    // Front-end password match validation
    if (values.password !== values.confirmPassword) {
      setError("Passwords do not match!");
      setLoading(false); // Deactivate spinner
>>>>>>> b3e59061f21708641346bf4bd1c61034a77e7742
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        values
      );
<<<<<<< HEAD
      setMessage("Registration successful!");
      setError("");
      console.log("Registration successful:", response.data);
      window.location.href = "/login";
=======
      if (response.status === 201) {
        setMessage("Registration successful!");
        setError("");
        console.log("Registration successful:", response.data);
      } else {
        setError("Registration failed");
        setMessage("");
        console.error("Registration failed:", response.data);
      }
>>>>>>> b3e59061f21708641346bf4bd1c61034a77e7742
    } catch (error) {
      setError(error.response?.data.message || error.message);
      setMessage("");
<<<<<<< HEAD
      console.error(
        "Error registering user:",
        error.response?.data.message || error.message
      );
    } finally {
      setLoading(false);
=======
      console.error("Error registering user:", error.response?.data || error.message);
    } finally {
      setLoading(false); // Always deactivate spinner after API call
>>>>>>> b3e59061f21708641346bf4bd1c61034a77e7742
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome To Bora!!</h1>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && (
          <div className="spinner-container">
            <div className="spinner" role="status"></div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="John Doe"
              required
              autoComplete="username"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="johndoe@example.com"
              required
<<<<<<< HEAD
              autoComplete="username"
=======
              autoComplete="new-password"
>>>>>>> b3e59061f21708641346bf4bd1c61034a77e7742
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="********"
              required
              autoComplete="new-password"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirm-password" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirm-password"
              name="confirmPassword"
              placeholder="********"
              required
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
<<<<<<< HEAD
             {loading ? (
              <span className="visually-hidden">Loading...</span>
            ) : (
              "Sign"
            )}
            Sign Up
=======
            {loading ? (
              <span className="visually-hidden">Loading...</span>
            ) : (
              "Sign Up"
            )}
>>>>>>> b3e59061f21708641346bf4bd1c61034a77e7742
          </button>
          <div className="mt-3 text-center">
            <p className="fw-bold">
              Already have an account? <a href="/login">Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
