import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const BACKEND_URL = "http://localhost:5000";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${BACKEND_URL}/auth/register`, {
        username,
        password,
      });
      console.log(response.data.message); // Successful registration message
    } catch (error) {
      console.error("Error registering:", error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>

      <p>
        Already member? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
