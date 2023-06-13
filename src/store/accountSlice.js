"use client";
import { createSlice } from "@reduxjs/toolkit";

const accountSlice = createSlice({
    name: "account",
    initialState: {
        acconut: "",
    },
    reducers: {
        setAccount(state, action){
            acconut = action
        },
        disconnectAccount(state, action){

        },
    }
});

export const {setAccount, disconnectAccount} = accountSlice.actions;

export default accountSlice.reducer;