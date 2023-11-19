import React, { useState } from "react";
import { Typography, Container, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import "./NotificationComponent.css";
import DataModel from "../../../app/components/Notification/Models/Models";

const Notification = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  // Przykładowe dane dla modelu
  const sampleData = new DataModel("PKO Bank Polski", "200 000 PLN", "3 miesiące", "5%", "bez wymagań", "indywidualny");

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <Container className="notification-container">
      <div className="clickable-area" onClick={handleOpenDialog}>
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
      </div>

      {/* Dialog z dodatkowymi informacjami */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Więcej informacji</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Bank: {sampleData.name}</Typography>
          <Typography variant="body1">Limit: {sampleData.limit}</Typography>
          <Typography variant="body1">Czas: {sampleData.time}</Typography>
          <Typography variant="body1">Oprocentowanie: {sampleData.interest}</Typography>
          <Typography variant="body1">Typ ofert: {sampleData.offerType}</Typography>
          <Typography variant="body1">Typ klienta: {sampleData.client_type}</Typography>
       
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Zamknij
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Notification;
