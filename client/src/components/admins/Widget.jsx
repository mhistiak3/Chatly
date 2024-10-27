import { Box, Paper, Typography } from "@mui/material";

const Widget = ({ title, count, icon, color }) => {
  return (
    <Paper
      sx={{
        padding: "2rem",
        width: { xs: "100%", sm: "320px" },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      
        gap: "1rem",
        borderRadius: "0.5rem",
      }}
    >
      {/* Circular Count Display */}
      <Box
        sx={{
          width: "90px",
          height: "90px",
          borderRadius: "50%",
          border: `4px solid ${color}`,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: color,
          fontSize: "1.8rem",
          fontWeight: "bold",
        }}
      >
        {count}
      </Box>

      {/* Icon and Label */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "text.primary",
          gap: "0.8rem",
        }}
      >
        <Box
          sx={{
            fontSize: "2.2rem",
            color: color,
          }}
        >
          {icon}
        </Box>
        <Typography variant="h5" color="text.secondary">
          {title}
        </Typography>
      </Box>
    </Paper>
  );
};
export default Widget;
