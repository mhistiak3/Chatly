import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Box
      bgcolor={"background.default"}
      width={"100vw"}
      height={"100vh"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Container component={"main"} maxWidth="sm">
        <Paper
          elevation={4}
          variant="outlined"
          sx={{
            padding: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">{isLogin ? "Login" : "Register"}</Typography>
          {isLogin ? (
            <>
              <TextField
                variant="outlined"
                type="email"
                label="Email"
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                required
                fullWidth
                margin="normal"
              />
            </>
          ) : (
            <>
              <TextField
                variant="outlined"
                type="text"
                label="Name"
                required
                fullWidth
                margin="normal"
              />
              <TextField
                variant="outlined"
                type="email"
                label="Email"
                required
                fullWidth
                margin="normal"
              />
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                required
                fullWidth
                margin="normal"
              />
            </>
          )}
          <Button variant="contained" color="primary" size="large" fullWidth sx={{ my: 2 }}>
            {isLogin ? "Login" : "Register"}
          </Button>
          {isLogin ? (
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => setIsLogin(false)}
            >
              If you new here then!{" "}
              <Typography component="span" color="primary">
                Register
              </Typography>
            </Typography>
          ) : (
            <Typography
              sx={{ cursor: "pointer" }}
              onClick={() => setIsLogin(true)}
            >
              Already have an account?{" "}
              <Typography component="span" color="primary">
                Login
              </Typography>
            </Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
};
export default Login;
