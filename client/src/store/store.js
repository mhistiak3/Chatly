import { configureStore } from "@reduxjs/toolkit";
import authSilce from "./reducers/auth.reducer";
import api from "./api/api";
import otherSilce from "./reducers/other.reducer";
const store = configureStore({
  reducer: {
    [authSilce.name]: authSilce.reducer,
    [api.reducerPath]: api.reducer,
    [otherSilce.name]: otherSilce.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    [...getDefaultMiddleware(), api.middleware],
});
export default store;
