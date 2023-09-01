import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import BACKEND_URL from "../api/BACKEND_URL";

const MyOrder = () => {
  const navigate = useNavigate();
  const { authState } = useAuth();
  if (!authState) {
    return (
      <div>
        You need to login to access this page <Link to="/login">Login</Link>
      </div>
    );
  }
  const username = authState?.username || "Guest";
  const admin = authState?.admin ? "admin" : "user";
  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}/auth/logout`, {
        withCredentials: true,
      });
      // onLogout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <Navbar></Navbar>
      <div>MyOrder</div>

      <div>
        Recently no orders are avaiable but if you are are here that means that
        you are loged in successfully
      </div>
      <div>
        you can go back to home page click here --- <Link to="/home">Home</Link>
      </div>
    </>
  );
};

export default MyOrder;
