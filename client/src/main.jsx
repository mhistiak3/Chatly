import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { CssBaseline } from "@mui/material";
import { HelmetProvider } from "react-helmet-async";
import { LayoutLoader } from "./components/index.js";
const App = lazy(() => import("./App.jsx"));
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <CssBaseline />
      <Suspense fallback={<LayoutLoader />}>
        <App />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
