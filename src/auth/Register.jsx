import React from "react";
import axios from "axios";
import "../App.css";

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    if (values.password !== values.confirmPassword) {
      console.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4000/user/register",
        values
      );
      setMessage("Registration successful!");
      setError("");
      console.log("Registration successful:", response.data);

      // window.location.href = "/login";
    } catch (error) {
      setError(error.response?.data || error.message);
      setMessage("");
      console.error(
        "Error registering user:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Welcome To Bora!!</h1>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
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
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
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
