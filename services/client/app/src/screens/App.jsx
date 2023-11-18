import React from "react";
import Sidebar from "./module/app/components/Sidebar/SidebarComponent";
import Dashboard from "./module/dashboard/Dashboard";
import Stack from "@mui/material/Stack";
import "./styles.css";
import theme from "./theme";
import { ThemeProvider } from "@mui/material/styles";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Stack direction="row" spacing={4}>
          <Sidebar />
          <div className="content">
            <Dashboard />
          </div>
        </Stack>
      </div>
    </ThemeProvider>
  );
}

export default App;
