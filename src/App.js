import React, { useState } from "react"; // Import useState
import HomePage from "./Pages/HomePage";
import LoginPage from "./Pages/LoginPage";
import RegisterPage from "./Pages/RegisterPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import createBrowserRouter

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform logout logic
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    {
      path: "login",
      element: <LoginPage onLogin={handleLogin} />,
    },
    {
      path: "register",
      element: <RegisterPage />,
    },
    {
      path: "home",
      element: (
        <HomePage isLoggedIn={isLoggedIn} onLogout={handleLogout}></HomePage>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
