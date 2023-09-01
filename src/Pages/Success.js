import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Lottie from "lottie-react";
import "../components/cart/cart.css";
import "./success.css";
import {
  fetchAllProducts,
  fetchCartItems,
  removeCartItem,
  updateCartItemQuantity,
} from "../api/productAPI";
import { useAuth } from "../Auth/AuthContext";
import { toast } from "react-toastify";
import Loader from "../components/loader/Loader";
import { loader1 } from "../components/loaders/lottieani";

const Success = () => {
  const [subTotal, setSubTotal] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [pageLoading, setPageLoading] = useState(true);
  const { authState, setAuthState } = useAuth();
  // const authState = {
  //   userId: "64ef9aa69b6f1cd07abe80ee",
  //   username: "DevJariwala",
  //   admin: true,
  // };
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

  if (pageLoading) {
    setTimeout(() => {
      setPageLoading(false);
    }, 6000);
    return (
      <>
        <div className="page-loading">
          <Lottie animationData={loader1} />
        </div>
      </>
    );
  }

  const animationData = {
    v: "4.8.0",
    meta: { g: "LottieFiles AE 1.0.0", a: "", k: "", d: "", tc: "" },
    fr: 60,
    ip: 0,
    op: 130,
    w: 512,
    h: 512,
    nm: "HDFC Success",
    ddd: 0,
    assets: [],
    layers: [
      {
        ddd: 0,
        ind: 1,
        ty: 4,
        nm: "check",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [256, 256, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: { a: 0, k: [100, 100, 100], ix: 6 },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ind: 0,
                ty: "sh",
                ix: 1,
                ks: {
                  a: 0,
                  k: {
                    i: [
                      [0, 0],
                      [0, 0],
                      [0, 0],
                    ],
                    o: [
                      [0, 0],
                      [0, 0],
                      [0, 0],
                    ],
                    v: [
                      [-82.5, 4.5],
                      [-31, 55],
                      [73, -52.5],
                    ],
                    c: false,
                  },
                  ix: 2,
                },
                nm: "Path 1",
                mn: "ADBE Vector Shape - Group",
                hd: false,
              },
              {
                ty: "tm",
                s: { a: 0, k: 0, ix: 1 },
                e: {
                  a: 1,
                  k: [
                    {
                      i: { x: [0.667], y: [1] },
                      o: { x: [1], y: [0.076] },
                      t: 60,
                      s: [0],
                    },
                    { t: 85, s: [100] },
                  ],
                  ix: 2,
                },
                o: { a: 0, k: 0, ix: 3 },
                m: 1,
                ix: 2,
                nm: "Trim Paths 1",
                mn: "ADBE Vector Filter - Trim",
                hd: false,
              },
              {
                ty: "st",
                c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 30, ix: 5 },
                lc: 2,
                lj: 2,
                bm: 0,
                nm: "Stroke 1",
                mn: "ADBE Vector Graphic - Stroke",
                hd: false,
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, 0], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: "Transform",
              },
            ],
            nm: "Shape 1",
            np: 4,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false,
          },
        ],
        ip: 0,
        op: 240,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 3,
        ty: 4,
        nm: "Shape Layer 2",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [256, 257.86, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0, 0, 0.833], y: [0.98, 0.98, -66.114] },
                o: { x: [0.656, 0.656, 0.167], y: [0.872, 0.872, 67.114] },
                t: 20,
                s: [0, 0, 100],
              },
              { t: 60, s: [150, 150, 100] },
            ],
            ix: 6,
          },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                d: 1,
                ty: "el",
                s: { a: 0, k: [236, 236], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                nm: "Ellipse Path 1",
                mn: "ADBE Vector Shape - Ellipse",
                hd: false,
              },
              {
                ty: "fl",
                c: {
                  a: 0,
                  k: [0.172549019608, 0.854901960784, 0.580392156863, 1],
                  ix: 4,
                },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: "Fill 1",
                mn: "ADBE Vector Graphic - Fill",
                hd: false,
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, -3], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: "Transform",
              },
            ],
            nm: "Ellipse 1",
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false,
          },
        ],
        ip: 0,
        op: 240,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 4,
        ty: 4,
        nm: "Shape Layer 1",
        sr: 1,
        ks: {
          o: {
            a: 1,
            k: [
              {
                i: { x: [0.626], y: [0.729] },
                o: { x: [0.912], y: [0.073] },
                t: 76,
                s: [100],
              },
              { t: 119, s: [0] },
            ],
            ix: 11,
          },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [256, 257.86, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: {
            a: 1,
            k: [
              {
                i: { x: [0, 0, 0.667], y: [0.999, 0.999, 1] },
                o: { x: [0.477, 0.477, 0.333], y: [0.587, 0.587, 0] },
                t: 10,
                s: [0, 0, 100],
              },
              {
                i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] },
                o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] },
                t: 50,
                s: [150, 150, 100],
              },
              {
                i: { x: [0.833, 0.833, 0.833], y: [1, 1, 1] },
                o: { x: [0.167, 0.167, 0.167], y: [0, 0, 0] },
                t: 76,
                s: [150, 150, 100],
              },
              { t: 123, s: [210, 210, 100] },
            ],
            ix: 6,
          },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                d: 1,
                ty: "el",
                s: { a: 0, k: [236, 236], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                nm: "Ellipse Path 1",
                mn: "ADBE Vector Shape - Ellipse",
                hd: false,
              },
              {
                ty: "st",
                c: { a: 0, k: [1, 1, 1, 1], ix: 3 },
                o: { a: 0, k: 100, ix: 4 },
                w: { a: 0, k: 2, ix: 5 },
                lc: 1,
                lj: 1,
                ml: 4,
                bm: 0,
                nm: "Stroke 1",
                mn: "ADBE Vector Graphic - Stroke",
                hd: false,
              },
              {
                ty: "fl",
                c: {
                  a: 0,
                  k: [0.783504889993, 0.945098039216, 0.880089314779, 1],
                  ix: 4,
                },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: "Fill 1",
                mn: "ADBE Vector Graphic - Fill",
                hd: false,
              },
              {
                ty: "tr",
                p: { a: 0, k: [0, -3], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: "Transform",
              },
            ],
            nm: "Ellipse 1",
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false,
          },
        ],
        ip: 0,
        op: 240,
        st: 0,
        bm: 0,
      },
      {
        ddd: 0,
        ind: 5,
        ty: 4,
        nm: "BG",
        sr: 1,
        ks: {
          o: { a: 0, k: 100, ix: 11 },
          r: { a: 0, k: 0, ix: 10 },
          p: { a: 0, k: [256, 256, 0], ix: 2 },
          a: { a: 0, k: [0, 0, 0], ix: 1 },
          s: { a: 0, k: [100, 100, 100], ix: 6 },
        },
        ao: 0,
        shapes: [
          {
            ty: "gr",
            it: [
              {
                ty: "rc",
                d: 1,
                s: { a: 0, k: [554, 556], ix: 2 },
                p: { a: 0, k: [0, 0], ix: 3 },
                r: { a: 0, k: 0, ix: 4 },
                nm: "Rectangle Path 1",
                mn: "ADBE Vector Shape - Rect",
                hd: false,
              },
              {
                ty: "fl",
                c: { a: 0, k: [1, 1, 1, 1], ix: 4 },
                o: { a: 0, k: 100, ix: 5 },
                r: 1,
                bm: 0,
                nm: "Fill 1",
                mn: "ADBE Vector Graphic - Fill",
                hd: false,
              },
              {
                ty: "tr",
                p: { a: 0, k: [-1, 6], ix: 2 },
                a: { a: 0, k: [0, 0], ix: 1 },
                s: { a: 0, k: [100, 100], ix: 3 },
                r: { a: 0, k: 0, ix: 6 },
                o: { a: 0, k: 100, ix: 7 },
                sk: { a: 0, k: 0, ix: 4 },
                sa: { a: 0, k: 0, ix: 5 },
                nm: "Transform",
              },
            ],
            nm: "Rectangle 1",
            np: 3,
            cix: 2,
            bm: 0,
            ix: 1,
            mn: "ADBE Vector Group",
            hd: false,
          },
        ],
        ip: 240,
        op: 240,
        st: 0,
        bm: 0,
        hidden: 0,
      },
    ],
    markers: [],
  };

  return (
    <>
      <div className="cart-desktop">
        <div className="cart-container">
          <div className="order-details">
            <div className="lottie-animation-success">
              <Lottie animationData={animationData} />
            </div>
            <h2 className="bold-font f-chenla">Payment Sucessfull..!</h2>
            <h4 className="light-font f-chenla">Order Number: #585858</h4>
          </div>

          <div className="shopping-cart">
            <h3 className="bold-font f-capriolo">Billing Details</h3>
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
                          <span className="cart-i-quantity f-chenla">
                            Qty {cartItem.quantity}
                          </span>
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
                  Shipping and taxes included.
                </div>
              </div>
              <div className="bold-font total-price f-chenla">
                ${subTotal.toFixed(2)}
              </div>
            </div>
            <Link to="/myorder">
              <button className="checkout-btn f-capriolo">My Orders</button>
            </Link>
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

export default Success;
