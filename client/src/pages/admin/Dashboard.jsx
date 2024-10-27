import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { AdminLayout } from "../../components";
import DashboardTopBar from "../../components/admins/DashboardTopBar";

import DashboardState from "../../components/admins/DashboardState";
import {
  DoughnutChart,
  LineChart,
} from "../../components/admins/DashboardChart";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
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
              <LineChart />
            </Paper>
            {/* 2 */}
            <Paper
              sx={{
                padding: "2rem",
                borderRadius: "0.5rem",
                display: "flex",
                width: { xs: "100%", lg: "40%" },
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <Typography sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>
                Last Messages
              </Typography>
              <Box sx={{ position: "relative",display: "flex", justifyContent: "center", alignItems: "center" }}>
                <DoughnutChart value={[10, 20]} />
                <Box
                  sx={{
                    position: "absolute",
                    top: "55%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <GroupIcon /> vs <PersonIcon />
                </Box>
              </Box>
            </Paper>
          </Stack>

          <DashboardState />
        </Box>
      </Container>
    </AdminLayout>
  );
};
export default Dashboard;
