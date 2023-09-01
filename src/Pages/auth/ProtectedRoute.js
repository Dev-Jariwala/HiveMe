import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import checkAuthentication from "./checkAuthentication";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const authenticated = await checkAuthentication();
      setIsAuthenticated(authenticated);
    }
    fetchData();
  }, []);

  return isAuthenticated ? children : <Navigate to="/home"></Navigate>;
};

export default ProtectedRoute;
