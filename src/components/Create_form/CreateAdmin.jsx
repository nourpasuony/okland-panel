import React, { useState } from "react";
import {
  CssBaseline,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
  Grid,
  LinearProgress,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateAdmin = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [adminData, setAdminData] = useState({
    username: "",
    phonenum: "",
    email: "",
    password: "",
    role: "admin",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://92.112.181.199:5000/api/v1/create-admin",
        adminData
      );
      console.log("Admin created successfully:", response.data);
      navigate("/admins/show-admin");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Admin
        </Typography>

        {loading && <LinearProgress sx={{ mb: 2 }} />}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={adminData.username}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phonenum"
                value={adminData.phonenum}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="email"
                label="Email"
                name="email"
                value={adminData.email}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Password"
                name="password"
                value={adminData.password}
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Role</InputLabel>
                <Select
                  name="role"
                  value={adminData.role}
                  onChange={handleInputChange}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Admin"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default CreateAdmin;
