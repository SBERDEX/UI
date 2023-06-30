import { createSlice } from "@reduxjs/toolkit";

const isConnectedSlice = createSlice({
  name: "isConnected",
  initialState: {
    isConnected: false, // Исправлено с "acconut" на "account"
  },
  reducers: {
    setIsConnected(state, action) {
      state.isConnected = action.payload;
    },
  },
});

export const { setIsConnected } = isConnectedSlice.actions;

export default isConnectedSlice.reducer;
