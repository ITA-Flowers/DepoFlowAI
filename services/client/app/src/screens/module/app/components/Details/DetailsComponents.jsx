import React from "react";
import Paper from "@mui/material/Paper";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

// Komponent wyświetlający szczegóły rekordu
const DetailsComponent = ({ details, onClose }) => {
  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Szczegóły rekordu</DialogTitle>
      <DialogContent>
        <Paper>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Nazwa</TableCell>
                <TableCell>{details.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Limit</TableCell>
                <TableCell>{details.limit}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Czas</TableCell>
                <TableCell>{details.time}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Oprocentowanie</TableCell>
                <TableCell>{details.interest}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Typ oferty</TableCell>
                <TableCell>{details.offerType}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Rodzaj klienta</TableCell>
                <TableCell>{details.client_type}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      </DialogContent>
    </Dialog>
  );
};

export default DetailsComponent;
