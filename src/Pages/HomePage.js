import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BACKEND_URL = "http://localhost:5000"; // Update with your backend URL

const HomePage = ({ onLogout, isLoggedIn }) => {
  const location = useLocation();
  const username = location.state?.username || "Guest";
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/auth/logout`);
      onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <h2>Welcome, {username}!</h2>

      {isLoggedIn ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <Link to="/login">
          <button>Login</button>
        </Link>
      )}
      {/* Rest of your home page content */}
    </div>
  );
};

export default HomePage;
