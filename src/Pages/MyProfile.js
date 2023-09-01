import React from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../components/navbar/Navbar";
import BACKEND_URL from "../api/BACKEND_URL";

const MyProfile = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
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
      setAuthState(null); // Update authState to null
      toast.success("Loged out sucessfully");
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const notify = () => toast.success("Login Sucessfull!");
  return (
    <>
      <Navbar></Navbar>
      <div>MyProfile</div>
      <div>
        you can go back to home page click here --- <Link to="/home">Home</Link>
      </div>
      <h2>
        Welcome, {username}! you are {admin}
      </h2>

      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

export default MyProfile;
