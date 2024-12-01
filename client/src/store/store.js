import { configureStore } from "@reduxjs/toolkit";
import authSilce from "./reducers/auth.reducer";
import api from "./api/api";
const store = configureStore({
  reducer: {
    [authSilce.name]: authSilce.reducer,
    [api.reducerPath]: api.reducer
  },
  middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware(), api.middleware],
});
export default store;
