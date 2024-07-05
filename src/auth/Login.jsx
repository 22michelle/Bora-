import React, { useState } from "react";
import axios from "axios";
import "../App.css";

const Login = () => {
  const [message, setMessage] = useState(""); 
  const [error, setError] = useState(""); 
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    setLoading(true); // spinner

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        values
      );
      setMessage("Login successful!");
      setError("");
      console.log("Login successful:", response.data);
      window.location.href = "/dashboard";
    } catch (error) {
      setError(error.response?.data.message || error.message);
      setMessage("");
      console.error("Error login:", error.response?.data.message || error.message);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login to Bora!!</h1>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        {loading && (
          <div className="spinner-container">
            <div className="spinner" role="status"></div>
          </div>
        )}
        <form onSubmit={handleSubmit}>
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
              autoComplete="new-password"
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

          <button type="submit" className="btn btn-primary">
            {loading ? (
              <span className="visually-hidden">Loading...</span>
            ) : (
              "Login"
            )}
          </button>
          <div className="mt-3 text-center">
            <p className="fw-bold">
              Don't have an account? <a href="/">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
