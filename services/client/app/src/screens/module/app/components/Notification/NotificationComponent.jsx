import React, { useState , useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import DataModel from "./Models/Models";
import "./NotificationComponetns.css";
import DetailsComponent from '../Details/DetailsComponents'
const columns = [
  { id: "name", label: "Nazwa", minWidth: 170 },
  { id: "limit", label: "Limit", minWidth: 100 },
  {
    id: "time",
    label: "Czas",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("pl-PL"),
  },
  {
    id: "interest",
    label: "Oprocentowanie",
    minWidth: 170,
    align: "right",
    format: (value) => value.toLocaleString("pl-PL"),
  },
  {
    id: "offerType",
    label: "Typ oferty",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "client_type",
    label: "Rodzaj klienta",
    minWidth: 170,
    align: "right",
  },
];

function createData(name, limit, time, interest, offerType, client_type) {
  const data = new DataModel(
    name,
    limit,
    time,
    interest,
    offerType,
    client_type
  );

  return data;
}

const rows = [
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
  createData("Santander", 900000, "Roczne", "20%", "samo", "dzilaaa"),
];

export default function Notification() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };




  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row) => {
    setSelectedRow(row);
  };

  const handleCloseDetails = () => {
    setSelectedRow(null);
  };

  return (
    <div>
      <Paper sx={{ width: "100%", overflow: "hidden", color: "black" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => handleRowClick(row)}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {selectedRow && (
        <DetailsComponent details={selectedRow} onClose={handleCloseDetails} />
      )}
    </div>
  );
}
