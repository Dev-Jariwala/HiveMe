import React from "react"; // Import useState
import { AuthProvider } from "./Auth/AuthContext";
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import createBrowserRouter
import Error404Page from "./Pages/Error404Page";
import OrderSucess from "./Pages/OrderSucess";
import MyOrder from "./Pages/MyOrder";
import MyProfile from "./Pages/MyProfile";

import Checkout from "./Pages/Checkout";
import Admin from "./Pages/Admin";
import ProtectedRoute from "./Pages/auth/ProtectedRoute";
import CartPage from "./Pages/CartPage";
import TotalProducts from "./Pages/TotalProducts";
import Success from "./Pages/Success";
import Cancel from "./Pages/Cancel";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "login",
      element: <LoginPage />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "home",
      element: <HomePage></HomePage>,
    },
    {
      path: "admin",
      element: <Admin></Admin>,
    },
    {
      path: "ordersucess",
      element: <OrderSucess></OrderSucess>,
    },
    {
      path: "myorder",
      element: <MyOrder></MyOrder>,
    },
    {
      path: "myprofile",
      element: <MyProfile></MyProfile>,
    },
    {
      path: "cart",
      element: <CartPage></CartPage>,
    },
    {
      path: "checkout",
      element: <Checkout></Checkout>,
    },
    {
      path: "totalproducts",
      element: <TotalProducts></TotalProducts>,
    },
    {
      path: "success",
      element: <Success></Success>,
    },
    {
      path: "cancel",
      element: <Cancel></Cancel>,
    },
    {
      path: "*",
      element: <Error404Page></Error404Page>,
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
