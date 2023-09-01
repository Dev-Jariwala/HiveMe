import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import "./cart.css";
import {
  fetchAllProducts,
  fetchCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "../../api/productAPI";
import { useAuth } from "../../Auth/AuthContext";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";
import BACKEND_URL from "../../api/BACKEND_URL";

const Cart = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const { authState, setAuthState } = useAuth();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const userId = authState?.userId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartItems = await fetchCartItems(userId);
        setCartProducts(cartItems);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchData();
  }, [userId]);
  useEffect(() => {
    let sum = 0;
    let result = cartProducts.map(
      (cartItem) => cartItem.product.price * cartItem.quantity
    );
    for (let i = 0; i < result.length; i++) {
      sum += result[i];
    }
    setSubTotal(sum);
  }, [cartProducts]);
  const updateQuantityInDatabase = async (cartItemId, newQuantity) => {
    try {
      await updateCartItemQuantity(cartItemId, newQuantity);
      const updatedCartItems = await fetchCartItems(userId);
      setCartProducts(updatedCartItems);
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };
  // Define a CSS class for the disabled buttons
  const disabledButtonClass = "disabled-button";

  const increaseQuantity = (cartItemId) => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);

    setCartProducts((prevCartProducts) =>
      prevCartProducts.map((cartItem) =>
        cartItem._id === cartItemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );

    const updatedQuantity =
      cartProducts.find((item) => item._id === cartItemId).quantity + 1;
    updateQuantityInDatabase(cartItemId, updatedQuantity);
  };

  const decreaseQuantity = (cartItemId) => {
    if (isButtonDisabled) return;

    setIsButtonDisabled(true);
    setTimeout(() => {
      setIsButtonDisabled(false);
    }, 2000);

    setCartProducts((prevCartProducts) =>
      prevCartProducts.map((cartItem) =>
        cartItem._id === cartItemId && cartItem.quantity > 1
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      )
    );

    const updatedQuantity = Math.max(
      cartProducts.find((item) => item._id === cartItemId).quantity - 1,
      1
    );
    updateQuantityInDatabase(cartItemId, updatedQuantity);
  };

  const handleRemove = async (cartItemId) => {
    try {
      // Display a pending toast
      const toastId = toast.promise(removeCartItem(cartItemId), {
        pending: "Removing item from Cart...",
        success: "Item removed from Cart 👌",
        error: "Failed to remove item from Cart 🤯",
      });

      // Wait for the removal to complete
      await toastId.promise;

      // Fetch updated cart items
      const updatedCartItems = await fetchCartItems(userId);
      setCartProducts(updatedCartItems);
    } catch (error) {
      console.log(error);
      // Handle any error here if needed
    }
  };
  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51NlVFwSEaPBnmk4qytLArA8bj0cdr2WxYmwCVZRINgBllRoUawk5thGjmjl9hspytC2Mkm0u1Ua4jbYfeGrJF3rF00lKB3FhsB"
    );
    const body = {
      products: cartProducts,
    };
    const headers = {
      "Content-Type": "application/json", // Corrected content type
    };
    console.log(body);
    const response = await fetch(
      `${BACKEND_URL}/product/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    const session = await response.json();
    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    if (result.error) {
      console.log(result.error);
    }
  };

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
              <div className="cart-items">
                {cartProducts.map((cartItem) => (
                  <div key={cartItem._id} className="cart-item">
                    <img
                      className="cart-i-img"
                      src={cartItem.product.imageSrc}
                      alt={cartItem.product.title}
                    />

                    <div className="cart-i-content">
                      <div className="cart-i-top">
                        <div className="cart-i-info">
                          <div className="bold-font cart-i-title f-chenla">
                            {cartItem.product.title}
                          </div>
                          <div className="light-font cart-i-color f-chenla">
                            {cartItem.product.color}
                          </div>
                        </div>
                        <div className="bold-font cart-i-price f-chenla">
                          $
                          {(cartItem.product.price * cartItem.quantity).toFixed(
                            2
                          )}
                        </div>
                      </div>
                      <div className="cart-i-bottom">
                        <div className="quantity-controls">
                          <button
                            className={`quantity-btn ${
                              isButtonDisabled ? disabledButtonClass : ""
                            }`}
                            onClick={() => decreaseQuantity(cartItem._id)}
                          >
                            -
                          </button>
                          <span className="cart-i-quantity f-chenla">
                            Qty {cartItem.quantity}
                          </span>
                          <button
                            className={`quantity-btn ${
                              isButtonDisabled ? disabledButtonClass : ""
                            }`}
                            onClick={() => increaseQuantity(cartItem._id)}
                          >
                            +
                          </button>
                        </div>
                        <div
                          className="remove-btn f-chenla blue-text"
                          onClick={() => handleRemove(cartItem._id)}
                        >
                          Remove
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
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
            <button className="checkout-btn f-capriolo" onClick={makePayment}>
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

export default Cart;
