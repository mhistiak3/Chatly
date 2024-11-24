import { configureStore } from "@reduxjs/toolkit";
import authSilce from "./reducers/auth.reducer";
const store = configureStore({
  reducer: {
    [authSilce.name]: authSilce.reducer,
  },
});
export default store;
