import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  Avatar,
  IconButton,
} from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { useState } from "react";
import { VisuallyHiddenInput } from "../components/StyledComponent";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  return (
    <Box
      bgcolor={"background.default"}
      width={"100vw"}
      height={"100vh"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Container component={"main"} maxWidth="xs">
        <Paper
          variant="outlined"
          sx={{
            padding: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">
            {isLogin ? "Login" : "Create account"}
          </Typography>
          {isLogin ? (
            <>
              <TextField
                variant="outlined"
                type="text"
                label="Username"
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
              <Stack
                position="relative"
                width="8rem"
                marginX="auto"
                marginY="15px"
              >
                <Avatar
                  sx={{ width: "8rem", height: "8rem", objectFit: "cover" }}
                />
                <Box
                  position="absolute"
                  bottom={0}
                  right={0}
                  component="label"
                  htmlFor="avatar"
                >
                  <VisuallyHiddenInput type="file" id="avatar" />
                  <IconButton
                    aria-label="Upload Avatar"
                    component="span"
                    sx={{
                      backgroundColor: "primary.main",
                      ":hover": { backgroundColor: "primary.dark" },
                      padding: "5px",
                    }}
                  >
                    <CameraAlt sx={{ fontSize: "1.5rem" }} />
                  </IconButton>
                </Box>
              </Stack>
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
                type="text"
                label="Bio"
                required
                fullWidth
                margin="normal"
              />
              <TextField
                variant="outlined"
                type="text"
                label="Username"
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
          <Button
            variant="contained"
            color="primary"
            size="large"
            fullWidth
            sx={{ my: 2 }}
          >
            {isLogin ? "Login" : "Register"}
          </Button>
          <Typography sx={{ cursor: "pointer" }} onClick={() => toggleLogin()}>
            {isLogin ? (
              <>
                Don't have an account?{" "}
                <Typography component="span" color="primary">
                  Register
                </Typography>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Typography component="span" color="primary">
                  Login
                </Typography>
              </>
            )}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};
export default Login;
