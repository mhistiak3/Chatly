import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  user: null,
  isAdmin: false,
  isLoading: true,
};
const authSilce = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExist(state, action) {
      state.user = action.payload;
      state.isLoading = false;
    },
    userNotExist(state) {
      state.user = null;
     state.isLoading = false;
    },
  }
});

export const { userExist, userNotExist } = authSilce.actions;
export default authSilce;