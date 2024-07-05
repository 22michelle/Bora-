import React from "react";
import axios from "axios";
import "../App.css";

const Login = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const values = Object.fromEntries(formData.entries());

    try {
      const response = await axios.post(
        "http://localhost:4000/user/login",
        values
      );
      console.log("Login successful:", response.data);
      // Almacena el token en el localStorage y redirige al dashboard
      localStorage.setItem("token", response.data.token);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Login to Bora!!</h1>
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
              autoComplete="username"
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
            Login
          </button>
          <div className="mt-3 text-center">
            <p className="fw-bold">
              Don't have an account? <a href="/register">Sign up</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
