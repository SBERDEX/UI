import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    account: "", // Исправлено с "acconut" на "account"
  },
  reducers: {
    setBalance(state, action) {
      state.account = action.payload;
    },
  },
});

export const { setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
