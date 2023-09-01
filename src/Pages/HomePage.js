import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./products.css";
import { useAuth } from "../Auth/AuthContext";
import Navbar from "../components/navbar/Navbar";
import { addToCart, fetchAllProducts } from "../api/productAPI";
import { toast } from "react-toastify";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { authState } = useAuth();

  const username = authState?.username || "New User";
  const role = authState ? (authState?.admin ? "admin" : "user") : "Guest";
  const isAdmin = authState?.admin;
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await fetchAllProducts();
        // setDataProducts(products);
        setProducts(allProducts); // Set the fetched products as cartProducts
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  const filterProduct = (value) => {
    return value;
  };
  const handleAdd = async (productId) => {
    if (!authState) {
      // User is not logged in, navigate to the login page
      navigate("/cart");
      return;
    }

    // User is logged in, add product to cart
    toast.promise(
      new Promise(async (resolve, reject) => {
        try {
          await addToCart(productId);
          // Product added successfully
          resolve("Item added to Cart 👌");
        } catch (error) {
          // Error adding the product
          reject("Failed to add item to Cart 🤯");
        }
      }),
      {
        pending: "Adding item to Cart...", // This will be displayed while the promise is pending
        success: (message) => message, // No need to modify the success message
        error: (message) => message, // No need to modify the error message
        autoClose: 1000,
      }
    );
  };

  return (
    <div>
      <Navbar></Navbar>
      <h2 className="middle">
        Welcome, {username}! you are {role}
      </h2>
      <div className="wrapper">
        <div id="search-container">
          <input
            type="search"
            id="search-input"
            placeholder="Search product name here.."
          />
          <button id="search">Search</button>
        </div>
        <div id="buttons">
          <button className="button-value" onClick={() => filterProduct("all")}>
            All
          </button>
          <button
            className="button-value"
            onClick={() => filterProduct("Topwear")}
          >
            Topwear
          </button>
          <button
            className="button-value"
            onClick={() => filterProduct("Bottomwear")}
          >
            Bottomwear
          </button>
          <button
            className="button-value"
            onClick={() => filterProduct("Jacket")}
          >
            Jacket
          </button>
          <button
            className="button-value"
            onClick={() => filterProduct("Watch")}
          >
            Watch
          </button>
        </div>
        <div id="products">
          {products.map((product) => (
            <div key={product.title} className={`card`}>
              <Link to="/productdetail">
                <div className="image-container">
                  <img src={product.imageSrc} alt="" />
                </div>
                <div className="container">
                  <h5 className="product-name">{product.title}</h5>
                  <h4>${product.price}</h4>
                </div>
              </Link>
              <button
                className="addToCart"
                onClick={() => handleAdd(product._id)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
