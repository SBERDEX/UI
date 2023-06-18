import { createSlice } from "@reduxjs/toolkit";

const balanceSlice = createSlice({
  name: "balance",
  initialState: {
    balance: "", // Исправлено с "acconut" на "account"
  },
  reducers: {
    setBalance(state, action) {
      state.balance = action.payload;
    },
  },
});

export const { setBalance } = balanceSlice.actions;

export default balanceSlice.reducer;
