import React, { useState, useEffect, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
} from "@mui/material";
import { List, GridOn, Add, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const AdminList = () => {
  const [view, setView] = useState("list");
  const [admins, setAdmins] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleViewChange = (newView) => setView(newView);

  const fetchAdmins = useCallback(async () => {
    try {
      const url = search
        ? `http://92.112.181.199:5000/api/v1/search-admins/?term=${search}`
        : `http://92.112.181.199:5000/api/v1/get-all-admins?page=${page}&limit=5`;
      
      const response = await fetch(url);
      const data = await response.json();

      if (data.admins) {
        setAdmins(data.admins);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  }, [page, search]);

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  return (
    <Box>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Admin List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => navigate("/admins/add-admin")}
          >
            Add Admin
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <TextField
            variant="outlined"
            placeholder="Search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{ startAdornment: <Search sx={{ mr: 1 }} /> }}
            sx={{ width: "30%" }}
          />
          <Box>
            <IconButton
              sx={{ color: view === "list" ? "primary.main" : "gray" }}
              onClick={() => handleViewChange("list")}
            >
              <List />
            </IconButton>
            {/* <IconButton
              sx={{ color: view === "grid" ? "primary.main" : "gray" }}
              onClick={() => handleViewChange("grid")}
            >
              <GridOn />
            </IconButton> */}
          </Box>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone No.</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admins.map((admin) => (
                <TableRow key={admin._id}>
                  <TableCell>{admin.username}</TableCell>
                  <TableCell>{admin.email}</TableCell>
                  <TableCell>{admin.phonenum}</TableCell>
                  <TableCell>{admin.role}</TableCell>
                  <TableCell>
                    {/* <Button
                      variant="contained"
                      sx={{ mr: 1, backgroundColor: "green", color: "white", "&:hover": { backgroundColor: "darkgreen" } }}
                    >
                      Update
                    </Button> */}
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "red", color: "white", "&:hover": { backgroundColor: "darkred" } }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(event, value) => setPage(value)}
            color="primary"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default AdminList;
