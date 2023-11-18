import React from "react";
import { Route, Routes } from "react-router";
import Monitoring from "./monitoring/Monitoring";
import Footer from "./footer/Footer";
import "./Dashboard.css";

const Dashboard = () => {
  // Logika generowania wykresu typu linia
  return (
    <div className="dashboard-container">
      <div className="container">
        <Routes>
          <Route path="/" element={<Monitoring />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
