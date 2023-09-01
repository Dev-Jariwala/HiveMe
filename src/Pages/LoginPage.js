import "./login.css";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BACKEND_URL from "../api/BACKEND_URL";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setAuthState } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await toast.promise(
        axios.post(
          `${BACKEND_URL}/auth/login`,
          {
            username,
            password,
          },
          {
            withCredentials: true,
          }
        ),
        {
          pending: "Logging in...",
          success: "Login successful!",
          error: "Failed to login. Please check your credentials.",
        }
      );

      const { message, user } = response.data;
      console.log("Logged in as:", user);
      // Set authentication state
      setAuthState({
        username: user.username,
        admin: user.admin,
        userId: user._id,
      });
      navigate("/home");
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
      console.error("Error logging in:", error.response.data.message);
    }
  };

  return (
    <div className="l-form-container">
      <Link to="/">
        <div className="b-logo">
          <img src="img/hmlogo.png" alt="brand-logo" />
        </div>
      </Link>
      <div className="f-capriolo l-heading">You must Login to join</div>
      <div className="f-chenla l-desc">Popular and Trending Products</div>
      <form onSubmit={handleLogin}>
        <div className="f-field">
          <label className="f-chenla f-label">Username:</label>
          <input
            type="text"
            value={username}
            className="f-chenla f-input"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="f-field">
          <label className="f-chenla f-label">Password:</label>
          <input
            type="password"
            value={password}
            className="f-chenla f-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="login-button f-capriolo" type="submit">
          Login
        </button>
        <p className="f-chenla f-errors">{error}</p>
      </form>
      <p className="f-chenla f-link">
        Don't have an account?
        <Link to="/register">
          <span className="f-capriolo f-span">Register</span>
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
