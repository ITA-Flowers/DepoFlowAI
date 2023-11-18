import React from "react";
import Notification from "./Notification/NotificationComponent";
import Charts from "./Charts/ChartsComponent";
import Filters from "./Filters/FiltersComponent";
import { Grid, Paper } from "@mui/material";
import "./Monitoring.css";

const Monitoring = () => {
  // Logika generowania wykresu typu linia
  return (
    <Grid container spacing={2}>
      <Grid item xs={3}>
        <Paper elevation={3} className="container sidebar-dsh">
          <Notification />
        </Paper>
        <Paper elevation={3} className=" container sidebar-dsh">
          <Filters />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper elevation={3} className="container chart-dsh">
          <Charts />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Monitoring;
