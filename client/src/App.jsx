import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./utils/DarkTheme.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Group = lazy(() => import("./pages/Group.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
import { Toaster } from "react-hot-toast";
import { LayoutLoader, ProtectedRoute } from "./components";
import Profile from "./pages/Profile.jsx";
const App = () => {
  const user = true;
  return (
    <ThemeProvider theme={darkTheme}>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute user={user} />}>
            <Route
              path="/"
              element={
                <Suspense fallback={<LayoutLoader />}>
                  <Home />
                </Suspense>
              }
            />
            <Route path="/chat/:chatId" element={<Chat />} />
            <Route
              path="/groups"
              element={
                <Suspense fallback={<LayoutLoader />}>
                  <Group />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<LayoutLoader />}>
                  <Profile />
                </Suspense>
              }
            />
          </Route>

          <Route
            path="/login"
            element={
              <ProtectedRoute user={!user} redirect="/">
                <Login />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
