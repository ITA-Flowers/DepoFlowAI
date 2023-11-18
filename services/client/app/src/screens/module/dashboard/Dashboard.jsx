import React from "react";
import { Route, Routes } from "react-router";
import Monitoring from "./monitoring/Monitoring";
import Notifcation from "../app/components/Notification/NotificationComponent";
const Dashboard = () => {
  // Logika generowania wykresu typu linia
  return (
    <>
      <Routes>
        <Route path="/monitoring" element={<Monitoring />}></Route>
        <Route path="/notification" element={<Notifcation />}></Route>
      </Routes>
    </>
  );
};

export default Dashboard;
