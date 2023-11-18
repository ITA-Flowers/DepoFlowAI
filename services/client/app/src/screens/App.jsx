import React from "react";
import Header from "./module/app/components/Header/HeaderComponent";
import Sidebar from "./module/app/components/Sidebar/SidebarComponent";
import Dashboard from "./module/dashboard/Dashboard";
import "./styles.css";

function App() {
  return (
    <div className="app">
      <Header title="My Dashboard App" />
      <Sidebar />
      <div className="content">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;
