import { Box, Grid2 } from "@mui/material";
import AdminSidebar from "../admins/AdminSidebar";
import { useState } from "react";

export const AdminLayout = ({ children }) => {

  return (
    <Box>
      <Grid2 container >
        <Grid2
          size={{ xs: 12, sm: 3, md: 2 }}
          
        >
          <AdminSidebar  />
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 9, md: 10 }}>{children}</Grid2>
      </Grid2>
    </Box>
  );
};
