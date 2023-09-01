import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { useAuth } from "../Auth/AuthContext";
import Navbar from "../components/navbar/Navbar";
import StatCard from "../components/stat-card/StatCard";
import "./admin.css";

const Admin = () => {
  const navigate = useNavigate();
  const { authState, setAuthState } = useAuth();
  const isAdmin = authState?.admin;
  if (!isAdmin) {
    return <Navigate to="/home" />;
  }
  const username = authState?.username;

  return (
    <>
      <Navbar></Navbar>

      <h1 className="p-heading">Admin Dashboard</h1>

      <div className="statcards-container">
        <StatCard
          icon={<i class="fa-solid fa-users"></i>}
          color={"red"}
          title={"Total Users"}
          data={5}
          stat={2}
          link={"users"}
        ></StatCard>
        <StatCard
          icon={<i class="fa-brands fa-product-hunt"></i>}
          color={"yellow"}
          title={"Total Products"}
          data={10}
          stat={4}
          link={"totalproducts"}
        ></StatCard>
        <StatCard
          icon={<i class="fa-solid fa-cart-shopping"></i>}
          color={"blue"}
          title={"Products Sold"}
          data={50}
          stat={27}
          link={"soldproducts"}
        ></StatCard>
        <StatCard
          icon={<i class="fa-solid fa-chart-simple"></i>}
          color={"purple"}
          title={"Total Sales"}
          data={5000}
          stat={3550}
          link={"totalsales"}
        ></StatCard>
        <StatCard
          icon={<i class="fa-solid fa-dollar-sign"></i>}
          color={"green"}
          title={"Total Revnue"}
          data={3579}
          stat={1795}
          link={"totalrevenue"}
        ></StatCard>
        <StatCard
          icon={<i class="fa-solid fa-gear"></i>}
          color={"orange"}
          title={"Verify Orders"}
          data={50}
          stat={27}
          link={"verifyorders"}
        ></StatCard>
      </div>
    </>
  );
};

export default Admin;
