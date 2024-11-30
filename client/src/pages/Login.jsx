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
import { toast } from "react-hot-toast";
import axios from "axios";
import { validateProfileForm } from "../utils/validators";
import getImagePreview from "../utils/getImagePreview";
import { VisuallyHiddenInput } from "../components";
import { server } from "../constants/config";
import { useDispatch } from "react-redux";
import { userExist } from "../store/reducers/auth.reducer";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // form state
  const [form, setForm] = useState({
    name: "",
    bio: "",
    username: "",
    password: "",
  });
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const toggleLogin = () => setIsLogin((prev) => !prev);
  const handleInputChnage = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    const preview = await getImagePreview(file);
    setAvatarPreview(preview);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // validation
      const errors = validateProfileForm(form);
      if (errors.username) return toast.error(errors.username);
      if (errors.password) return toast.error(errors.password);

      // login
      try {
        setIsLoading(true);
        const user = await axios.post(
          `${server}/api/v1/user/login`,
          {
            username: form.username,
            password: form.password,
          },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (user.data.success) {
          toast.success(user.data.message);
          dispatch(userExist(true));
          navigate("/");
        } else {
          toast.error(user.data.message);
        }
        setIsLoading(false);
      } catch (error) {
        toast.error(error?.response?.data?.message || error.message);
      }
      setIsLoading(false);
    } else {
      // validation
      const errors = validateProfileForm(form);
      if (!avatar) return toast.error("Please select an avatar");
      if (errors.name) return toast.error(errors.name);
      if (errors.bio) return toast.error(errors.bio);
      if (errors.username) return toast.error(errors.username);
      if (errors.password) return toast.error(errors.password);

      // register
      try {
        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("bio", form.bio);
        formData.append("username", form.username);
        formData.append("password", form.password);
        formData.append("avatar", avatar);

        const user = await axios.post(
          `${server}/api/v1/user/register`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (user?.data?.success) {
          toast.success(user.data.message);
          dispatch(userExist(true));
          navigate("/");
        } else {
          toast.error(user.data.message);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
      }
      setIsLoading(false);
    }
  };
  return (
    <Box
      bgcolor={"background.default"}
      width={"100vw"}
      height={"100vh"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Container component={"main"} maxWidth="xs">
        <Paper
          component={"form"}
          onSubmit={handleSubmit}
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
                name="username"
                label="Username"
                required
                fullWidth
                margin="normal"
                value={form.username}
                onChange={handleInputChnage}
              />
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                name="password"
                required
                fullWidth
                margin="normal"
                value={form.password}
                onChange={handleInputChnage}
              />
            </>
          ) : (
            <>
              <Stack
                position="relative"
                width="6rem"
                marginX="auto"
                marginY="15px"
              >
                <Avatar
                  src={avatar && avatarPreview}
                  sx={{ width: "6rem", height: "6rem", objectFit: "cover" }}
                />
                <Box
                  position="absolute"
                  bottom={0}
                  right={0}
                  component="label"
                  htmlFor="avatar"
                >
                  <VisuallyHiddenInput
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <IconButton
                    aria-label="Upload Avatar"
                    component="span"
                    sx={{
                      backgroundColor: "primary.main",
                      ":hover": { backgroundColor: "primary.dark" },
                      padding: "5px",
                    }}
                  >
                    <CameraAlt sx={{ fontSize: "1.2rem" }} />
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
                name="name"
                value={form.name}
                onChange={handleInputChnage}
              />
              <TextField
                variant="outlined"
                type="text"
                label="Bio"
                required
                fullWidth
                margin="normal"
                name="bio"
                value={form.bio}
                onChange={handleInputChnage}
              />
              <TextField
                variant="outlined"
                type="text"
                label="Username"
                required
                fullWidth
                margin="normal"
                name="username"
                value={form.username}
                onChange={handleInputChnage}
              />
              <TextField
                type="password"
                variant="outlined"
                label="Password"
                required
                fullWidth
                margin="normal"
                name="password"
                value={form.password}
                onChange={handleInputChnage}
              />
            </>
          )}
          <Button
            disabled={isLoading}
            type="submit"
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
