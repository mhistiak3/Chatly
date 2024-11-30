import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import { ThemeProvider } from "@mui/material";
import darkTheme from "./utils/DarkTheme.js";
import { Toaster } from "react-hot-toast";
import { LayoutLoader, ProtectedRoute } from "./components";
import axios from "axios";
import { server } from "./constants/config.js";
import { useDispatch, useSelector } from "react-redux";
import { userExist, userNotExist } from "./store/reducers/auth.reducer.js";

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Group = lazy(() => import("./pages/Group.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));
const Profile = lazy(() => import("./pages/Profile.jsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.jsx"));
const Dahsboard = lazy(() => import("./pages/admin/Dashboard.jsx"));
const UsersManagement = lazy(() => import("./pages/admin/UsersManagement.jsx"));
const GroupsManagement = lazy(() =>
  import("./pages/admin/GroupsManagement.jsx")
);
const MessagesMenagement = lazy(() =>
  import("./pages/admin/MessagesMenagement.jsx")
);

const App = () => {
  let {user, isLoading} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const isUser = await axios.get(`${server}/api/v1/user/profile`, {
          withCredentials: true,
        });
        
        if (isUser.data.success) {
          dispatch(userExist(isUser.data.user));
        } else {
          dispatch(userNotExist());
        }
      } catch (error) {
        console.log(error.response.data.message);
        dispatch(userNotExist());
      }
    })();
  }, [dispatch])
console.log(user);
  return isLoading ? (
    <LayoutLoader />
  ) : (
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

          {/* Admin */}
          <Route
            path="/admin/login"
            element={
              <Suspense fallback={<LayoutLoader />}>
                <AdminLogin />
              </Suspense>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <Suspense fallback={<LayoutLoader />}>
                <Dahsboard />
              </Suspense>
            }
          />
          <Route
            path="/admin/users"
            element={
              <Suspense fallback={<LayoutLoader />}>
                <UsersManagement />
              </Suspense>
            }
          />
          <Route
            path="/admin/messages"
            element={
              <Suspense fallback={<LayoutLoader />}>
                <MessagesMenagement />
              </Suspense>
            }
          />
          <Route
            path="/admin/groups"
            element={
              <Suspense fallback={<LayoutLoader />}>
                <GroupsManagement />
              </Suspense>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
