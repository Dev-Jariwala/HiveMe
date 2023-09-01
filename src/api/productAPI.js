import axios from "axios";
import BACKEND_URL from "./BACKEND_URL";

export const fetchAllProducts = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/product/products`, null, {
      withCredentials: true,
    });
    return response.data.products; // Return the fetched products
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};
export const fetchCartItems = async (userId) => {
  try {
    const response = await axios.get(
      `${BACKEND_URL}/product/cartitems/${userId}`,
      {
        withCredentials: true,
      }
    );
    return response.data.cartItems; // Return the fetched products
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};
export const addToCart = async (productId) => {
  try {
    return new Promise(async (resolve, reject) => {
      try {
        await axios.post(
          `${BACKEND_URL}/product/add-to-cart/${productId}`,
          null,
          {
            withCredentials: true,
          }
        );

        resolve("Item added to Cart");
      } catch (error) {
        console.error("Error adding product to cart:", error);
        reject("Error adding product to cart:");
      }
    });
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};
export const updateCartItemQuantity = async (cartItemId, newQuantity) => {
  try {
    await axios.put(
      `${BACKEND_URL}/product/updatecart/${cartItemId}`,
      { newQuantity },
      {
        withCredentials: true,
      }
    );
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error; // Re-throw the error to handle it in the caller
  }
};

export const removeCartItem = async (cartItemId) => {
  try {
    console.log("here");
    await axios.delete(`${BACKEND_URL}/product/cartitems/${cartItemId}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error removing cart item:", error);
  }
};
