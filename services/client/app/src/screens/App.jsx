import React from "react";
import Header from "./module/app/components/Header/HeaderComponent";
import Sidebar from "./module/app/components/Sidebar/SidebarComponent";
import Dashboard from "./module/dashboard/Dashboard";
import Stack from '@mui/material/Stack';
import "./styles.css";

function App() {
  return (
    <div className="app">
     
      <Stack direction='row' spacing={4}>
        <Sidebar />
        <div className="content">
          <Dashboard />
        </div>
      </Stack>
    </div>
  );
}

export default App;
