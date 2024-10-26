import React from "react";
import { AppLayout } from "../components";
import { Box, Typography } from "@mui/material";

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
    
        height: "calc(100vh - 3.5rem)",
        padding: " 5rem 2rem",
        backgroundColor: "#2c2c2c",
        color: "#fff",
        borderRadius: "10px", // Slightly more rounded corners
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        display: { xs: "none", sm: "block" },
      }}
    >
      <Box sx={{ marginBottom: "2rem", textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: "0.5rem",
            textTransform: "uppercase",
          }} // Uppercase for emphasis
        >
          Welcome to Chatly
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#bbb" }}>
          Your personal messaging space
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "5rem 2rem", // Increased padding for the empty state box
          backgroundColor: "#3b3b3b",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s", // Smooth transition on hover
          "&:hover": {
            backgroundColor: "#4a4a4a", // Change background color on hover
          },
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: "500", color: "white" }}>
          Select a chat to start messaging
        </Typography>
        <Typography variant="body1" sx={{ marginTop: "1rem", color: "#ccc" }}>
          No chats available. Start a new conversation!
        </Typography>
      </Box>
    </Box>
  );
};

export default AppLayout()(Home);
