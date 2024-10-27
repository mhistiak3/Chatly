import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { AdminLayout } from "../../components";
import DashboardTopBar from "../../components/admins/DashboardTopBar";

import DashboardState from "../../components/admins/DashboardState";

const Dashboard = () => {
  return (
    <AdminLayout>
      <Container>
        <Box sx={{ padding: "3rem 0.5rem " }}>
          <DashboardTopBar />

          <Stack
            spacing={2}
            sx={{ marginTop: "1rem" }}
            direction={{ xs: "column", md: "row" }}
          >
            <Paper
              sx={{
                padding: "2rem",
                borderRadius: "0.5rem",
                display: "flex",
                width: { xs: "100%", md: "60%" },
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Last Messages
              </Typography>
              <h2>Message</h2>
            </Paper>
            {/* 2 */}
            <Paper
              sx={{
                padding: "2rem",
                borderRadius: "0.5rem",
                display: "flex",
                width: { xs: "100%", md: "40%" },
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Last Messages
              </Typography>
              <h2>Message</h2>
            </Paper>
          </Stack>

       <DashboardState/>
        </Box>
      </Container>
    </AdminLayout>
  );
};
export default Dashboard;
