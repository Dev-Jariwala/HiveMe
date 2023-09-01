import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import "./cart.css";
import { useAuth } from "../../Auth/AuthContext";
import Loader from "../loader/Loader";

const NoUserCart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { authState, setAuthState } = useAuth();
  setTimeout(() => {
    setIsLoading(false);
  }, 1000);
  return (
    <>
      <Navbar></Navbar>
      <div className="cart-desktop">
        <div className="cart-container">
          <div className="shopping-cart">
            <h3 className="bold-font f-capriolo">Shopping Cart</h3>
            {isLoading ? ( // Display loader when isLoading is true
              <div className="loading">
                <Loader></Loader>
              </div>
            ) : (
              <div className="nl-container">
                <div>
                  You need to login before you can add products to the cart
                </div>
                <Link to="/login">
                  <button className="checkout-btn f-capriolo">Login</button>
                </Link>
              </div>
            )}
          </div>
          <div className="sub-total">
            <div className="total">
              <div className="total-content">
                <div className="bold-font f-capriolo">Subtotal</div>
                <div className="light-font f-chenla">
                  Shipping and taxes calculated at checkout.
                </div>
              </div>
              <div className="bold-font total-price f-chenla">
                ${subTotal.toFixed(2)}
              </div>
            </div>
            <button className="checkout-btn f-capriolo disabled-button">
              Checkout
            </button>
            <div className="continue">
              <span className="light-font f-chenla">or</span>
              <Link to="/home" className="f-chenla blue-text">
                Continue Shopping →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoUserCart;
