import React from "react";
import { Typography, Container } from "@mui/material";
import "./NotificationComponent.css";

const Notification = () => {
  // Logika generowania wykresu typu linia
  return (
    <Container className="notification-container">
      <div className="name">
        <Typography variant="body1" gutterBottom>
          Najciekawsza Oferta
        </Typography>
      </div>
      <Typography variant="h6" gutterBottom className="title">
        PKO Bank Polski
      </Typography>
      <Typography variant="body1" gutterBottom className="text-field">
        Długość: 3 miesiące
      </Typography>
      <Typography variant="body1" gutterBottom className="text-field">
        Oprocentowanie: 5%
      </Typography>
      <Typography variant="body1" gutterBottom className="text-field">
        Limit: 200 000 PLN
      </Typography>
    </Container>
  );
};

export default Notification;
