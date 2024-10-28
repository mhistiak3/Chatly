import { Box, Grid2 } from "@mui/material";
import { lazy, memo, Suspense, useEffect } from "react";
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
          <Suspense fallback={<div>Loading...</div>}>
            <AdminSidebar />
          </Suspense>
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 9, xl: 10 }}
          sx={{ height: "100vh", overflowY: "auto" }}
        >
          {children}
        </Grid2>
      </Grid2>
    </Box>
  );
});
