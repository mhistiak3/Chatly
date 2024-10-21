
import { CircularProgress, Box } from "@mui/material";
import { keyframes } from "@emotion/react";
import { styled } from "@mui/system";

// Define the keyframes for animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Create a styled component
const AnimatedSpinner = styled(CircularProgress)`
  animation: ${spin} 1s linear infinite;
  color: purple;
`;

export const Loading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <AnimatedSpinner />
    </Box>
  );
};


