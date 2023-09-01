import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../api/productAPI";
import Navbar from "../components/navbar/Navbar";
import { Link } from "react-router-dom";
import Loader from "../components/loader/Loader"; // Import your loader component
import "./totalproducts.css";
const TotalProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allProducts = await fetchAllProducts();
        setProducts(allProducts); // Set the fetched products as cartProducts
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar></Navbar>

      <h1 className="p-heading">Total Products</h1>
      {isLoading ? ( // Display loader when isLoading is true
        <div className="loading">
          <Loader></Loader>
        </div>
      ) : (
        <div id="products">
          {products.map((product) => (
            <div key={product.title} className={`card`}>
              <div className="card-head">
                <h3 className="product-name">{product.title}</h3>
                <div className="ed-btns">
                  <div className="ed-btn">
                    <i class="fa-solid fa-pen"></i>
                  </div>
                  <div className="ed-btn">
                    <i class="fa-solid fa-trash"></i>
                  </div>
                </div>
              </div>
              <div className="image-container">
                <img src={product.imageSrc} alt="" />
              </div>
              <div className="container">
                <h5 className="product-name">{product.title}</h5>
                <h4>${product.price}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default TotalProducts;
