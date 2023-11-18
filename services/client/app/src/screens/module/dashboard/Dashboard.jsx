import React from "react";
import { Route, Routes } from "react-router";
import Monitoring from "./monitoring/Monitoring";

const Dashboard = () => {
  // Logika generowania wykresu typu linia
  return (
    <>
      <Routes>
        <Route path="/monitoring" element={<Monitoring />}></Route>
      </Routes>
    </>
  );
};

export default Dashboard;
