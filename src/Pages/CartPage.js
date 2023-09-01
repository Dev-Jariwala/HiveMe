import React from "react";
import Cart from "../components/cart/Cart";
import NoUserCart from "../components/cart/NoUserCart";
import { useAuth } from "../Auth/AuthContext";

const CartPage = () => {
  const { authState } = useAuth();

  function returnComponent() {
    if (authState) {
      return <Cart></Cart>;
    } else {
      return <NoUserCart></NoUserCart>;
    }
  }

  return returnComponent(); // Call the function to render the component
};

export default CartPage;
