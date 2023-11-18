import React from "react";
import "./SidebarComponent.css";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import Header from "../Header/HeaderComponent";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import bank from "./assets/bank.png";
import monitoring from "./assets/monitoring.png";
import prediction from "./assets/prediction.png";
import notification from "./assets/notification.png";

const Sidebar = () => {
  const monitoringMatch = useMatch("/monitoring");
  const predykcjaMatch = useMatch("/predykcja");
  const notificationMatch = useMatch("/notification");

  return (
    <Stack direction="row" alignItems="flex-start">
      <Stack
        direction="column"
        spacing={2}
        width="250px"
        justifyContent="center"
        alignItems="center"
        marginTop="2rem"
      >
        <Avatar sx={{ bgcolor: "white" }} alt="Bank icon" src={bank}></Avatar>
        <Header title="DepoFlowAI" />
        {/* Monitoring */}
        <Stack direction="column" spacing={3}>
          <Link to="/">
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              className={monitoringMatch ? "button active" : "button"}
            >
              <Avatar sx={{ bgcolor: "#6A00FF" }} variant="rounded">
                <img src={monitoring} alt="Monitoring" />
              </Avatar>
              <h6>Monitoring</h6>
            </Stack>
          </Link>
          {/* Predykcja */}
          <Link to="/predykcja">
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              className={predykcjaMatch ? "button active" : "button"}
            >
              <Avatar sx={{ bgcolor: "#6A00FF" }} variant="rounded">
                <img src={prediction} alt="Predykcja" />
              </Avatar>
              <h6>Predykcja</h6>
            </Stack>
          </Link>
          {/* Powiadomienia */}
          <Link to="/notification">
            <Stack
              direction="row"
              spacing={2}
              alignItems="center"
              className={notificationMatch ? "button active" : "button"}
            >
              <Avatar sx={{ bgcolor: "#6A00FF" }} variant="rounded">
                <img src={notification} alt="Powiadomienia" />
              </Avatar>
              <h6>Powiadomienia</h6>
            </Stack>
          </Link>
        </Stack>
      </Stack>
      <div className="line"></div>
    </Stack>
  );
};

export default Sidebar;
