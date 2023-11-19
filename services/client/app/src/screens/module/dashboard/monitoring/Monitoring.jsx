import React from "react";
import Notification from "./Notification/NotificationComponent";
import Charts from "./Charts/ChartsComponent";
import Filters from "./Filters/FiltersComponent";
import { Grid, Paper } from "@mui/material";
import "./Monitoring.css";
import { useState } from "react";

const Monitoring = () => {
  const [dataToSend, setDataToSend] = useState(null);

  const handleDataChange = (newData) => {
    setDataToSend(newData);
  };

  const [dataToSend2, setDataToSend2] = useState(null);

  const handleDataChange2 = (newData) => {
    setDataToSend2(newData);
  };

  return (
    <Grid container spacing={2} className="content">
      <Grid item xs={3}>
        <Paper elevation={3} className="container sidebar-dsh-nt">
          <Notification />
        </Paper>
        <Paper elevation={3} className=" container sidebar-dsh-filter">
          <Filters data={dataToSend2} onDataChange={handleDataChange} />
        </Paper>
      </Grid>
      <Grid item xs={9}>
        <Paper elevation={3} className="container chart-dsh">
          <Charts data={dataToSend} onDataChange={handleDataChange2} />
        </Paper>
      </Grid>
    </Grid>
  );
};

export default Monitoring;
