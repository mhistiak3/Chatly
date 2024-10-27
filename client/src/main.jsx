import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { Box, CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { LayoutLoader } from "./components/index.js";
const App = lazy(() => import("./App.jsx"));
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <CssBaseline />

      <Suspense fallback={<LayoutLoader />}>
        {/* onContextMenu={(e) => e.preventDefault()} */}
        <Box>
          <App />
        </Box>
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
