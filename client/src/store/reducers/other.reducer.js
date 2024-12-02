import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedGroupChat: {
    chatId: "",
    groupChat: false,
  },
};
const otherSilce = createSlice({
  name: "other",
  initialState,
  reducers: {},
});

// export const {  } = otherSilce.actions;
export default otherSilce;
