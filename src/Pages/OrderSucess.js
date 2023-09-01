import React from "react";
import "./ordersucess.css";
const OrderSucess = () => {
  return (
    <div className="success-animation">
      <div className="success-icon">
        <div className="success-icon__checkmark"></div>
      </div>
      <div className="success-message">Order Successful!</div>
    </div>
  );
};

export default OrderSucess;
