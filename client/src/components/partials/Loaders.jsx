import { CircularProgress, Box, Skeleton } from "@mui/material";
import { keyframes } from "@emotion/react";
import { Grid, styled } from "@mui/system";

// Define the keyframes for animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Create a styled component for the animated spinner
const AnimatedSpinner = styled(CircularProgress)`
  animation: ${spin} 1s linear infinite;
  color: purple;
`;

// Loader for full layout (large loader)
export const LayoutLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full-screen height
      }}
    >
      <AnimatedSpinner size={80} /> {/* Large size for layout */}
    </Box>
  );
};

// Loader for medium components
export const MediumLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
      }}
    >
      <AnimatedSpinner size={50} />
    </Box>
  );
};

// Loader for small components (e.g., button loaders)
export const SmallLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50px", // Small height for small components
      }}
    >
      <AnimatedSpinner size={30} /> {/* Small size */}
    </Box>
  );
};

export const LayoutLoader = () => {
  return (
    <Grid container height={"100vh"} width={"100%"}>
      <Grid size={{ xs: 12, sm: 4 }} height={"100%"} padding={"0 5px"}>
        {Array.from({ length: 7 }).map((_, index) => (
          <Skeleton
            variant="rectangular"
            sx={{ height: "100px", marginBottom: "5px" }}
          />
        ))}
      </Grid>
      <Grid size={{ xs: 12, sm: 8 }} height={"100%"}>
        <Skeleton variant="rectangular" sx={{ height: "100%" }} />
      </Grid>
    </Grid>
  );
};
