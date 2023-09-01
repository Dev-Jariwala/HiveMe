import React from "react";
import { useAuth } from "../../Auth/AuthContext";

import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const { authState, setAuthState } = useAuth();
  const isAdmin = authState?.admin;
  const renderLinks = () => {
    if (!authState) {
      // User is not logged in, render the login link
      return (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      );
    } else {
      // User is logged in, render appropriate links
      return (
        <>
          <Link to="/cart">Cart</Link>
          <Link to="/myorder">My Orders</Link>
          <Link to="/myprofile">My Profile</Link>
          {isAdmin ? <Link to="/admin">Admin</Link> : null}
        </>
      );
    }
  };
  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <Link to="/home" className="nav-title">
          <div className="nav-brand">
            <img className="brand-logo" src="img/hmlogo.png" alt="" /> Hive Mart
          </div>
        </Link>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">{renderLinks()}</div>
    </div>
  );
};

export default Navbar;
