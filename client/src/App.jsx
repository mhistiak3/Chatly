import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "./components/Loading.jsx";
import { ThemeProvider } from '@mui/material';
import darkTheme from './utils/DarkTheme.js';

const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));
const Chat = lazy(() => import("./pages/Chat.jsx"));
const Group = lazy(() => import("./pages/Group.jsx"));
import { Toaster } from 'react-hot-toast'
const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Loading />}>
                <Home />
              </Suspense>
            }
          />
          <Route
            path="/chat/:chatId"
            element={
              <Suspense fallback={<Loading />}>
                <Chat />
              </Suspense>
            }
          />
          <Route
            path="/group"
            element={
              <Suspense fallback={<Loading />}>
                <Group />
              </Suspense>
            }
          />

          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
export default App;
