import React from "react";
import { Route, Routes } from "react-router";
import Monitoring from "./monitoring/Monitoring";
import Notification from "./../app/components/Notification/NotificationComponent";
import Footer from "./footer/Footer";
import { Paper } from "@mui/material";
import "./Dashboard.css";
import DataTable from "../app/components/Settings/SettingsComponent";
const Dashboard = () => {
  // Logika generowania wykresu typu linia
  return (
    <>
      <Paper elevation={3} className="dashboard-container">
        <div>
          <Routes>
            <Route path="/" element={<Monitoring />} />
            <Route path="/notification" element={<Notification />}></Route>
            <Route path="/settings" element={<DataTable />}></Route>
          </Routes>
        </div>
        <Footer />
      </Paper>
    </>
  );
};

export default Dashboard;
