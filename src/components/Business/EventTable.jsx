import React, { useState } from "react";
import {
  Box,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const EventsTable = ({ events }) => {
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("date");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (event) => {
    console.log("Edit event:", event);
  };

  const handleDelete = (event) => {
    console.log("Delete event:", event);
  };

  const sortedEvents = [...events].sort((a, b) => {
    if (orderBy === "date") {
      return order === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else {
      return order === "asc"
        ? a[orderBy].localeCompare(b[orderBy])
        : b[orderBy].localeCompare(a[orderBy]);
    }
  });

  const paginatedEvents = sortedEvents.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box>
      <TableContainer
        component={Paper}
        sx={{ backgroundColor: "#1c172e", width: "100%" }}
      >
        <Table sx={{ borderCollapse: "separate", borderSpacing: "0 10px" }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "#f5b400" }}>
                <TableSortLabel
                  active={orderBy === "name"}
                  direction={orderBy === "name" ? order : "asc"}
                  onClick={() => handleRequestSort("name")}
                  sx={{
                    color: "#f5b400",
                    "&.MuiTableSortLabel-root": { color: "#f5b400" },
                  }}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "#f5b400" }}>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleRequestSort("date")}
                  sx={{
                    color: "#f5b400",
                    "&.MuiTableSortLabel-root": { color: "#f5b400" },
                  }}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell sx={{ color: "#f5b400" }}>Time</TableCell>
              <TableCell sx={{ color: "#f5b400" }}>Location</TableCell>
              <TableCell sx={{ color: "#f5b400" }}>Description</TableCell>
              <TableCell sx={{ color: "#f5b400" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedEvents.map((event, index) => (
              <TableRow
                key={event.id}
                sx={{
                  backgroundColor: index % 2 === 0 ? "#231e36" : "#1c172e",
                  "&:hover": {
                    backgroundColor: "#231e36",
                  },
                }}
              >
                <TableCell sx={{ color: "#fafafa", border: "none" }}>
                  {event.name}
                </TableCell>
                <TableCell sx={{ color: "#fafafa", border: "none" }}>
                  {event.date}
                </TableCell>
                <TableCell sx={{ color: "#fafafa", border: "none" }}>
                  {event.time}
                </TableCell>
                <TableCell sx={{ color: "#fafafa", border: "none" }}>
                  {event.location}
                </TableCell>
                <TableCell sx={{ color: "#fafafa", border: "none" }}>
                  {event.description}
                </TableCell>
                <TableCell sx={{ color: "#fafafa", border: "none" }}>
                  <IconButton
                    onClick={() => handleEdit(event)}
                    sx={{ color: "#f5b400" }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(event)}
                    sx={{ color: "#f5b400" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 6, 9, 12, 16, 19, 21]}
          component="div"
          count={events.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{ color: "#fafafa" }}
        />
      </TableContainer>
    </Box>
  );
};

export default EventsTable;
