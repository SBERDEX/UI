"use client";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import balanceReducer from "./balanceSlice";
import isConnectedReducer from "./isConnectedSlice";

export const store = configureStore({
    reducer: {
        account: accountReducer,
        balance: balanceReducer,
        isConnected: isConnectedReducer,
    },
});

