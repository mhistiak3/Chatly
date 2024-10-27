import { Box, Container,  } from "@mui/material";
import { AdminLayout } from "../../components";
import DashboardTopBar from "../../components/admins/DashboardTopBar";

const Dashboard = () => {
  return (
    <AdminLayout>
      <Container>
        <Box sx={{ padding: "3rem 0.5rem " }}>
          <DashboardTopBar/>
        </Box>
      </Container>
    </AdminLayout>
  );
};
export default Dashboard;
