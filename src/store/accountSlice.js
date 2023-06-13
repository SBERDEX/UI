import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
  name: "account",
  initialState: {
    account: "", // Исправлено с "acconut" на "account"
  },
  reducers: {
    setAccount(state, action) {
      state.account = action.payload;
    },
    disconnectAccount(state, action) {
      // Логика отключения аккаунта
    },
  },
});

export const { setAccount, disconnectAccount } = accountSlice.actions;

export default accountSlice.reducer;
