import {
  Paper,
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NotificationsIcon from "@mui/icons-material/Notifications";

const DashboardTopBar = () => {
  return (
    <Paper
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        backgroundColor: "background.default",
        gap: { xs: "1rem", sm: 0 },
      }}
    >
      {/* Left Section: Icon and Search */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          flexDirection: { xs: "column", sm: "row" },
          width: "100%",
        }}
      >
        <AdminPanelSettingsIcon
          fontSize="large"
          sx={{ color: "primary.contrastText" }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            width: "100%",
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            fullWidth
            sx={{
              maxWidth: { sm: "300px" },
              minWidth: { xs: "100%", sm: "200px" },
            }}
          />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "primary.contrastText",
              color: "primary.main",
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Search
          </Button>
        </Box>
      </Box>

      {/* Right Section: Date and Notifications */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          justifyContent: { xs: "space-between", sm: "flex-end" },
          width: "100%",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          {new Date().toDateString()}
        </Typography>
        <IconButton sx={{ color: "primary.contrastText" }}>
          <NotificationsIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default DashboardTopBar;
