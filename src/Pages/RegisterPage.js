import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BACKEND_URL from "../api/BACKEND_URL";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const emailIsValid = (email) => {
        // Basic email validation using a regular expression
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      };
      if (
        username.length === "" ||
        password === "" ||
        cpassword === "" ||
        email === ""
      ) {
        return setError("You have to fill all details");
      }
      if (username.length < 4 || username.includes(" ")) {
        return setError(
          "Username must be 4 characters long and must not contain spaces"
        );
      }
      if (!emailIsValid(email)) {
        return setError("Enter Valid Email Address");
      }
      if (password.length < 8) {
        return setError("Password must be at least 8 characters long");
      }
      if (password !== cpassword) {
        return setError("Enter same passwords");
      }
      const response = await axios.post(
        `${BACKEND_URL}/auth/register`,
        {
          username,
          email,
          password,
          cpassword,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Registerd Sucessfuly");
      navigate("/login");
      console.log(response.data.message); // Successful registration message
    } catch (error) {
      setError("Failed to register. Please check your credentials.");
      console.error("Error registering:", error.response.data.message);
    }
  };

  return (
    <div className="l-form-container">
      <Link to="/">
        <div className="b-logo">
          <img src="img/hmlogo.png" alt="brand-logo" />
        </div>
      </Link>
      <div className="f-capriolo l-heading">You must Register to join</div>
      <div className="f-chenla l-desc">Popular and Trending Products</div>
      <form onSubmit={handleRegister}>
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
          <label className="f-chenla f-label">Email:</label>
          <input
            type="text"
            value={email}
            className="f-chenla f-input"
            onChange={(e) => setEmail(e.target.value)}
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
        <div className="f-field">
          <label className="f-chenla f-label">Confirm Password:</label>
          <input
            type="password"
            value={cpassword}
            className="f-chenla f-input"
            onChange={(e) => setCpassword(e.target.value)}
          />
        </div>
        <button className="login-button f-capriolo" type="submit">
          Register
        </button>
        <p className="f-chenla f-errors">{error}</p>
      </form>
      <p className="f-chenla f-link">
        Already a Member?
        <Link to="/login">
          <span className="f-capriolo f-span">Login</span>
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
