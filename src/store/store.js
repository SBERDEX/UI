"use client";
import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./accountSlice";
import balanceReducer from "./balanceSlice"

export const store = configureStore({
    reducer: {
        account: accountReducer,
        balance: balanceReducer
    },
});

