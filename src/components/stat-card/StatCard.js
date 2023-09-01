import React from "react";
import "./statcard.css";
import { Link } from "react-router-dom";

const StatCard = ({ icon, color, title, data, stat, link }) => {
  const increment = ((data - stat) / data) * 100;

  const whiteLineStyle = {
    width: `${increment}%`, // Set the width based on the increment percentage
  };

  return (
    <div>
      <Link to={`/${link}`}>
        <div className={`statcard ${color}`}>
          <div className="d-group">
            <div className="icon">{icon}</div>
            <div className="content">
              <div className="title ct">{title}</div>
              <div className="data ct">
                {data} ({stat}+ in last 28 days)
              </div>
              <div className="progress ct">
                <div className="white-line" style={whiteLineStyle}></div>
              </div>
              <div className="inc ct">{Math.round(increment)}% increased</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default StatCard;
