import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const BACKEND_URL = "http://localhost:5000";

const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/login`, {
        username,
        password,
      });
      const { message, user } = response.data;
      alert(message); // Successful login message
      console.log("Logged in as:", user.username);
      onLogin();
      navigate("/home", { state: { username: user.username } });
    } catch (error) {
      setError("Failed to login. Please check your credentials.");
      console.error("Error logging in:", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
        <p>{error}</p>
      </form>
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
