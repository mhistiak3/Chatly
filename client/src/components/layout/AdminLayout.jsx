import { Box, Grid2 } from "@mui/material";
import { lazy, memo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const AdminSidebar = lazy(() => import("../admins/AdminSidebar"));
const isAdmin = true;

export const AdminLayout = memo(({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
     return navigate("/admin/login");
    }
  }, [isAdmin]);
  
  return (
    <Box>
      <Grid2 container>
        <Grid2 size={{ xs: 12, sm: 3, xl: 2 }}>
          <AdminSidebar />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 9, xl: 10 }}>{children}</Grid2>
      </Grid2>
    </Box>
  );
})
