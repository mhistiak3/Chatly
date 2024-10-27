import { Box, Typography } from "@mui/material";

const Logo = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      <Box
        component="img"
        src="/logo.png"
        sx={{ width: { xs: "1.8rem", sm: "2.5rem" }, mr: 0.6 }}
      />
      <Typography
        variant="h5"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1rem", sm: "1.5rem" },
        }}
      >
        Chatly
      </Typography>
    </Box>
  );
}
export default Logo