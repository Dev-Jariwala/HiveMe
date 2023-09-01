import React from "react";
import "./error.css";
import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <Link to="/home">
      <div className="desktop">
        <img className="errorImg" alt="Element error cuate" src="img/error.gif" />
          
      </div>
    </Link>
  );
};

export default Error404Page;
