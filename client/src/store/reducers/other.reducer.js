import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  selectedGroupChat: {
    chatId: "",
    groupChat: true,
  },
};
const otherSilce = createSlice({
  name: "other",
  initialState,
  reducers: {},
});


export default otherSilce;
