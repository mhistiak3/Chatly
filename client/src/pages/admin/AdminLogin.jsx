import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const isAdmin = false;
const AdminLogin = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate()

  const handleLogin = () => {
    if (password === "") {
      setError("Please fill in all fields");
    } else {
      setError(null);
      // Handle login logic here
    }
  };

  useEffect(() => {
    if (isAdmin) {
     navigate("/admin/dashboard");
    }
  }, [isAdmin]);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
        padding: "1rem",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 400,
          padding: "2rem",
          textAlign: "center",
          borderRadius: "8px",
        }}
      >
        <Typography
          variant="h5"
          sx={{ fontWeight: "bold", marginBottom: "1rem" }}
        >
          Admin Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ marginBottom: "1rem" }}>
            {error}
          </Alert>
        )}

        <TextField
          label="Secret Key"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{ marginTop: "1.5rem", padding: "0.75rem" }}
        >
          Log In
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
