import { Box, Button, IconButton } from "@mui/material";
import Logo from "../shared/Logo";
import { Link } from "react-router-dom";
import {
  Dashboard,
  Group,
  Person,
  Message,
  Logout,
  Close,
  Menu,
} from "@mui/icons-material";
import { useEffect, useState } from "react";

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth >= 600); 
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setOpen(isLargeScreen);
  }, [isLargeScreen]);

  return (
    <Box sx={{ position: "relative" }}>
      {/* Responsive bar */}
      <Box
        sx={{
          display: { xs: "flex", sm: "none" },
          justifyContent: "space-between",
          height: "4.5rem",
          alignItems: "center",
          bgcolor: "background.default",
          color: "primary.contrastText",
          padding: "1rem",
        }}
      >
        <Logo />
        <IconButton onClick={() => setOpen(true)}>
          <Menu />
        </IconButton>
      </Box>
      {open && (
        <Box
          sx={{
            height: "100vh",
            width: "100%",
            position: { xs: "absolute", sm: "sticky" },
            top: 0,
            bgcolor: "background.default",
            color: "primary.contrastText",
            padding: "2rem 1rem",
            boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Logo Section */}
          <Box
            sx={{
              marginBottom: "3rem",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Logo />
            <IconButton onClick={() => setOpen(false)}>
              <Close sx={{ display: { sx: "block", sm: "none" } }} />
            </IconButton>
          </Box>

          {/* Navigation Links */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {[
              {
                to: "/admin/dashboard",
                icon: <Dashboard />,
                label: "Dashboard",
              },
              { to: "/admin/user", icon: <Person />, label: "Users" },
              { to: "/admin/groups", icon: <Group />, label: "Groups" },
              { to: "/admin/messages", icon: <Message />, label: "Messages" },
            ].map((item) => (
              <Link
                to={item.to}
                key={item.label}
                style={{ textDecoration: "none" }}
              >
                <Button
                  fullWidth
                  startIcon={item.icon}
                  sx={{
                    justifyContent: "flex-start",
                    color: "primary.contrastText",
                    textTransform: "none",
                    padding: "0.75rem",
                    fontSize: "1rem",
                    fontWeight: 500,
                    "&:hover": {
                      bgcolor: "background.paper",
                      transform: "scale(1.02)",
                    },
                    transition: "all 0.3s",
                  }}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </Box>

          {/* Logout Button */}
          <Button
            startIcon={<Logout />}
            sx={{
              justifyContent: "flex-start",
              bgcolor: "#d32f2f", // Red background for logout
              color: "primary.contrastText",
              textTransform: "none",
              padding: "0.75rem",
              fontSize: "1rem",
              fontWeight: 500,
              marginTop: "auto",
              "&:hover": {
                bgcolor: "#c62828", // Darker red on hover
                color: "primary.contrastText",
                transform: "scale(1.02)",
              },
              transition: "all 0.3s",
            }}
          >
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default AdminSidebar;
